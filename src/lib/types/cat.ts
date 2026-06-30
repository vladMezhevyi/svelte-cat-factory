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
export const CatType = {
	Square: 'square',
	Medium: 'medium',
	Small: 'small',
	XSmall: 'xsmall'
} as const;

export type CatType = (typeof CatType)[keyof typeof CatType];

export interface CatFilters {
	type?: CatType | null;
}
