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
