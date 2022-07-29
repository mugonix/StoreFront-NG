import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../models/paginated-response.model';
import { Product } from '../models/product.model';
import { SavedProductResponse } from '../models/saved-product-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(params:any):Observable<PaginatedResponse<Product>>{
    return this.http.get<PaginatedResponse<Product>>(environment.productListUrl, {params});
  }

  getUserProducts(params:any):Observable<PaginatedResponse<Product>>{
    return this.http.get<PaginatedResponse<Product>>(environment.userProductListUrl, {params});
  }

  addNewProducts(formData:FormData):Observable<SavedProductResponse>{
    return this.http.post<SavedProductResponse>(environment.addNewProductUrl, formData);
  }

  updateExistingProducts(productId:number, formData:FormData):Observable<SavedProductResponse>{
    return this.http.post<SavedProductResponse>(environment.addNewProductUrl+productId.toString(), formData);
  }

  deleteExistingProducts(productId:number):Observable<Object>{
    return this.http.delete<Object>(environment.addNewProductUrl+productId.toString());
  }
}
