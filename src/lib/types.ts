export interface PricingTier {
  tier: string;
  price: string;
  features: string[];
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  pricing: PricingTier[];
  features: string[];
  pros: string[];
  cons: string[];
  score: number;
  affiliateUrl: string;
  logo: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
}

export interface FeatureScore {
  feature: string;
  toolA: number;
  toolB: number;
}

export interface Comparison {
  slug: string;
  toolA: string;
  toolB: string;
  verdict: string;
  featureComparison: FeatureScore[];
}
