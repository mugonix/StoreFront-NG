import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: Product|null;

  constructor(private router: Router) {
    this.product = this.router.getCurrentNavigation()!.extras.state as Product;
    if(this.product == null){
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
  }

}
