import {
  FALLBACK_PRICING_REGION,
  type PricingRegion,
} from "../../app/data/pricing";

export default defineEventHandler((event) => {
  const header = getHeader(event, "x-vercel-ip-country")
    ?.trim()
    .toUpperCase();
  const country = header && /^[A-Z]{2}$/.test(header) ? header : "PH";
  const region: PricingRegion =
    country === "PH" ? "PH" : "INTERNATIONAL";

  return {
    country,
    region: header ? region : FALLBACK_PRICING_REGION,
    currency: region === "PH" ? "PHP" : "USD",
  };
});
