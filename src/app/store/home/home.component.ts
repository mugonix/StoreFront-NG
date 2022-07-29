import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { PaginatedResponse } from 'src/app/shared/models/paginated-response.model';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  page = 1;
  totalPage = 0;
  totalElements = 0;
  isLoading = true;
  productList: Product[] = [];

  constructor(private productService: ProductsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void { 
    this.getProductList();
  }

  handlePageChange(): void {
    this.page++;
    this.getProductList();
  }

  getProductList(): void {
    this.isLoading = true;
    const params = {page: this.page};

    this.productService.getProducts(params).pipe(finalize(()=>{
      this.isLoading = false;
    })).subscribe({next: (products:PaginatedResponse<Product>) => {
      this.productList.push(...products.data);
      this.page = products.current_page;
      this.totalPage = products.last_page;
      this.totalElements = products.total;
    },error: (err) => {
      this.snackBar.open(`Failed to load the products list.`, 'Dismiss', {
        duration: 5000,
      });
    },});
  }

}
