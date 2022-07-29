export interface Product {
	id: number;
	owner_id: number;
	name: string;
	price: number;
	image_path: string;
	deleted_at?: any;
	created_at: string;
	updated_at: string;
}
