export type Locale = 'tr' | 'en';

export type Product = {
  id: number;
  title: Record<Locale, string>;
  category: Record<Locale, string>;
  producer: string;
  producerLocation: Record<Locale, string>;
  color: Record<Locale, string>;
  style: Record<Locale, string>;
  material: Record<Locale, string>;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  verified: boolean;
  fulfillment: boolean;
  globalShipping: boolean;
  fastDelivery: boolean;
  pattern: 'kilim' | 'towel' | 'pillow' | 'rug' | 'linen' | 'canvas';
  description: Record<Locale, string>;
  sizes: string[];
};
