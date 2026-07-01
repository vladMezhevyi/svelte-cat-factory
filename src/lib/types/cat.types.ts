export interface Cat {
  id: string;
  url: string;
  tags?: string[];
  mimetype?: string;
  created_at: string;
}

export interface CatsCountResponse {
  count: number;
}

// Type
export const CatType = {
  Square: 'square',
  Medium: 'medium',
  Small: 'small',
  XSmall: 'xsmall'
} as const;

export type CatType = (typeof CatType)[keyof typeof CatType];

// Filter
export const CatFilter = {
  Mono: 'mono',
  Negate: 'negate',
  Custom: 'custom'
} as const;

export type CatFilter = (typeof CatFilter)[keyof typeof CatFilter];

// Filters
export interface CatFilters {
  type?: CatType | null;
  filter?: CatFilter | null;
}
