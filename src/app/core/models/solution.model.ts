export type SolutionCategory = 'module' | 'industry';

export interface Solution {
  id: number;
  slug: string;
  category: SolutionCategory;
  iconKey: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  heroImage: string;
  relatedIds: number[];
  pricePerSeat: number;
}
