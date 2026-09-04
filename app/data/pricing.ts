export type PricingRegion = "PH" | "INTERNATIONAL";
export type PackageId = "essential" | "premium";
export type CurrencyCode = "PHP" | "USD";

export interface RegionalPrice {
  amount: number;
  currency: CurrencyCode;
  label: string;
}

export const FALLBACK_PRICING_REGION: PricingRegion = "PH";

export const regionalPrices: Record<
  PricingRegion,
  Partial<Record<PackageId, RegionalPrice>>
> = {
  PH: {
    essential: {
      amount: 10000,
      currency: "PHP",
      label: "₱10,000",
    },
    premium: {
      amount: 25000,
      currency: "PHP",
      label: "₱25,000",
    },
  },
  INTERNATIONAL: {
    essential: {
      amount: 500,
      currency: "USD",
      label: "$500 USD",
    },
    premium: {
      amount: 1500,
      currency: "USD",
      label: "$1,500 USD",
    },
  },
};

export function isPricingRegion(value: unknown): value is PricingRegion {
  return value === "PH" || value === "INTERNATIONAL";
}

export function getPackagePrice(
  region: PricingRegion,
  packageId: PackageId,
): RegionalPrice {
  const price =
    regionalPrices[region][packageId] ||
    regionalPrices[FALLBACK_PRICING_REGION][packageId];

  if (!price) throw new Error(`Missing approved price for ${packageId}.`);
  return price;
}
