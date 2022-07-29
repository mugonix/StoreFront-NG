import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Product } from 'src/app/shared/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ManageProductDialogComponent } from 'src/app/shared/components/manage-product-dialog/manage-product-dialog.component';
import { DeleteProductDialogComponent } from 'src/app/shared/components/delete-product-dialog/delete-product-dialog.component';
import { PaginatedResponse } from 'src/app/shared/models/paginated-response.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  isLoadingCustomer = true;
  displayedColumns: string[] = ['image_path','name', 'price', 'action'];
  page = 0;
  pageSize = 50;
  totalElements = 0;
  isLoading = true;
  productList: PaginatedResponse<Product> | null = null;

  constructor(private productService: ProductsService, private snackBar:MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductList();
  }

  openManageProductDialog(product: Product|null = null){
    const dialog = this.dialog.open(ManageProductDialogComponent,{
      width: "460px",
      data: {product}
    });

    dialog.afterClosed().subscribe((value)=>{
      if(value === true){
        this.page = 0;
        this.getProductList();
      }
    });
  }

  openDeleteProductDialog(product: Product){
    const dialog = this.dialog.open(DeleteProductDialogComponent,{
      data: {product}
    });

    dialog.afterClosed().subscribe((value)=>{
      if(value === true){
        this.page = 0;
        this.getProductList();
      }
    });
  }

  handlePageChange(event:any): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProductList();
  }

  getProductList(): void {
    this.productList = null;
    this.isLoading = true;
    const params = {page: this.page, size: this.pageSize};

    this.productService.getUserProducts(params).subscribe({next: (products:PaginatedResponse<Product>) => {
      this.productList = products;
      this.page = products.current_page;
      this.totalElements = products.total;
      this.isLoading = false;
    },error: (err) => {
      this.snackBar.open(`Failed to load product list.`, 'Dismiss', {
        duration: 5000,
      });
      this.isLoading = false;
    },});
  }

}
