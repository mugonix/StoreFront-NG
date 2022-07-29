import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { SavedProductResponse } from '../../models/saved-product-response.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-manage-product-dialog',
  templateUrl: './manage-product-dialog.component.html',
  styleUrls: ['./manage-product-dialog.component.scss']
})
export class ManageProductDialogComponent implements OnInit {

  manageProductForm: FormGroup;
  product: Product|null;
  isLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ManageProductDialogComponent>,
     private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: {product: Product|null},
     private formBuilder: FormBuilder, private productsService: ProductsService) { 
      this.product = data.product;
      this.manageProductForm = this.formBuilder.group({
        name: [this.product==null?'':this.product.name, [Validators.required]],
        price: [this.product==null?'':this.product.price, [Validators.required,Validators.pattern('[0-9]*')]],
        image: [null,this.product==null?[Validators.required]:[]]
      });

     }

  ngOnInit(): void {
  }

  saveProduct(form:any){
    this.isLoading = true;
    let formData = new FormData();
    formData.append("name",form.name);
    formData.append("price",form.price);
    if(form.image != null){
      formData.append("image",form.image);
    }

    let observe: Observable<SavedProductResponse>;

    if(this.product == null){
      observe = this.productsService.addNewProducts(formData);
    }else{
      observe = this.productsService.updateExistingProducts(this.product.id, formData);
    }

    observe
    .pipe(finalize(()=>{this.isLoading = false;}))
    .subscribe({
      next:(value)=>{
        this.snackBar.open("The product has been "+(this.product == null?"added":"updated")+" successfully!","DISMISS",{duration: 5000})
        this.dialogRef.close(true);
    }, error:(err)=>{
      this.snackBar.open(err.error!.error! ?? "An error occured while trying to "+(this.product == null?"add":"update")+" the product!","DISMISS",{duration: 5000})
    }})


  }

  uploadFile(event: any) {
    const file = event.target?.files![0];
    this.manageProductForm.patchValue({
      image: file
    });

    this.manageProductForm.get('image')!.updateValueAndValidity()
  }


}
