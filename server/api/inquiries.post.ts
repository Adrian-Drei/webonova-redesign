import {
  getPackagePrice,
  isPricingRegion,
  type CurrencyCode,
  type PackageId,
  type PricingRegion,
} from "../../app/data/pricing";

interface InquiryBody {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  package?: string;
  launch?: string;
  budget?: string;
  description?: string;
  consent?: boolean;
  website?: string;
  startedAt?: number;
  pricingRegion?: PricingRegion;
  pricingCurrency?: CurrencyCode | null;
  pricingAmount?: number | null;
}

const attempts = new Map<string, { count: number; reset: number }>();

export default defineEventHandler(async (event) => {
  const body = await readBody<InquiryBody>(event);
  if (body.website)
    throw createError({ statusCode: 400, statusMessage: "Invalid submission." });
  if (!body.startedAt || Date.now() - body.startedAt < 2500)
    throw createError({
      statusCode: 429,
      statusMessage: "Please take a moment to review your inquiry before sending.",
    });

  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 60 * 60 * 1000 });
  } else {
    current.count++;
    if (current.count > 5)
      throw createError({
        statusCode: 429,
        statusMessage: "Too many inquiries. Please try again later.",
      });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const description = String(body.description || "").trim();
  if (
    name.length < 2 ||
    name.length > 120 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    !/^[+()\d\s.-]{7,30}$/.test(phone) ||
    description.length < 20 ||
    description.length > 1500 ||
    !body.consent
  )
    throw createError({
      statusCode: 422,
      statusMessage: "Please complete all required fields.",
    });

  const packageId = String(body.package || "unsure").slice(0, 30);
  const pricingRegion = isPricingRegion(body.pricingRegion)
    ? body.pricingRegion
    : "PH";
  const pricedPackage = ["essential", "premium"].includes(packageId)
    ? (packageId as PackageId)
    : null;
  const approvedPrice = pricedPackage
    ? getPackagePrice(pricingRegion, pricedPackage)
    : null;

  if (
    approvedPrice &&
    (body.pricingCurrency !== approvedPrice.currency ||
      Number(body.pricingAmount) !== approvedPrice.amount)
  )
    throw createError({
      statusCode: 422,
      statusMessage: "The selected package price is no longer valid. Please refresh and try again.",
    });

  const config = useRuntimeConfig(event);
  if (!config.supabaseUrl || !config.supabasePublishableKey)
    throw createError({
      statusCode: 503,
      statusMessage: "Inquiry storage is not configured.",
    });

  const record = {
    name,
    email,
    company: String(body.company || "").trim().slice(0, 160) || null,
    phone,
    service: String(body.service || "").slice(0, 50),
    package: packageId,
    pricing_region: pricingRegion,
    pricing_currency: approvedPrice?.currency || null,
    pricing_amount: approvedPrice?.amount || null,
    launch_timeline: String(body.launch || "").slice(0, 60) || null,
    budget: String(body.budget || "").slice(0, 40) || null,
    description,
    consent: true,
  };

  try {
    await $fetch(`${config.supabaseUrl}/rest/v1/project_inquiries`, {
      method: "POST",
      headers: {
        apikey: String(config.supabasePublishableKey),
        Authorization: `Bearer ${config.supabasePublishableKey}`,
        Prefer: "return=minimal",
      },
      body: record,
    });
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "We could not save your inquiry. Please try again shortly.",
    });
  }

  return { ok: true };
});
