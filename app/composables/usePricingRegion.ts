import {
  FALLBACK_PRICING_REGION,
  getPackagePrice,
  isPricingRegion,
  type PackageId,
  type PricingRegion,
} from "~/data/pricing";

interface PricingRegionResponse {
  country: string;
  region: PricingRegion;
  currency: "PHP" | "USD";
}

export function usePricingRegion() {
  const region = useState<PricingRegion>(
    "pricing-region",
    () => FALLBACK_PRICING_REGION,
  );
  const ready = useState("pricing-region-ready", () => false);
  const savedRegion = useCookie<PricingRegion | null>(
    "webonova-pricing-region",
    {
      default: () => null,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    },
  );

  async function initialize() {
    if (ready.value) return;

    if (isPricingRegion(savedRegion.value)) {
      region.value = savedRegion.value;
      ready.value = true;
      return;
    }

    try {
      const detected = await $fetch<PricingRegionResponse>(
        "/api/pricing-region",
      );
      // A manual choice made while detection was in flight always wins.
      if (ready.value) return;

      region.value = isPricingRegion(detected.region)
        ? detected.region
        : FALLBACK_PRICING_REGION;
    } catch {
      if (!ready.value) region.value = FALLBACK_PRICING_REGION;
    } finally {
      ready.value = true;
    }
  }

  function selectRegion(nextRegion: PricingRegion) {
    region.value = nextRegion;
    savedRegion.value = nextRegion;
    ready.value = true;
  }

  function priceFor(packageId: PackageId) {
    return getPackagePrice(region.value, packageId);
  }

  onMounted(initialize);

  return {
    region: readonly(region),
    ready: readonly(ready),
    initialize,
    selectRegion,
    priceFor,
  };
}
