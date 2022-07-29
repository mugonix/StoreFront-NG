import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { PaginatedResponse } from '../models/paginated-response.model';
import { PaymentSuccess } from '../models/payment-success.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  placeOrder(formData:any):Observable<PaymentSuccess>{
    return this.http.post<PaymentSuccess>(environment.placeOrderUrl, formData);
  }

  getUserOrders(params:any):Observable<PaginatedResponse<Order>>{
    return this.http.get<PaginatedResponse<Order>>(environment.userOrderListUrl, {params});
  }
}
