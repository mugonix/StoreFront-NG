import { Order } from "./order.model";


export interface PaymentSuccess {
	success: boolean;
	message: string;
	data: Order;
}