import { Product } from "./product.model";

export interface SavedProductResponse {
	success: boolean,
    data: Product
}