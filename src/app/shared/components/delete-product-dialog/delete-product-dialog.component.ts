import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { SavedProductResponse } from '../../models/saved-product-response.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss']
})
export class DeleteProductDialogComponent implements OnInit {

  isLoading:boolean = false;

  constructor(public dialogRef: MatDialogRef<DeleteProductDialogComponent>,private productsService: ProductsService,
    private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: {product: Product},) { }

  ngOnInit(): void {

  }

  deleteProduct(){
    this.isLoading = true;

    this.productsService.deleteExistingProducts(this.data.product.id)
    .subscribe({
      next:(value)=>{
        this.snackBar.open("The product has been deleted successfully!","DISMISS",{duration: 5000})
        this.dialogRef.close(true);
    }, error:(err)=>{
      this.snackBar.open("An error occured while trying to delete the product!","DISMISS",{duration: 5000})
    }, complete:()=>{
      this.isLoading = false;
    }})

  }

}
