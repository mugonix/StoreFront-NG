import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StripeCardElement, StripeCardElementOptions, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { finalize } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-make-payment-page',
  templateUrl: './make-payment-page.component.html',
  styleUrls: ['./make-payment-page.component.scss']
})
export class MakePaymentPageComponent implements OnInit {

  elements: StripeElements|undefined;
  card: StripeCardElement|undefined;
  
  product: Product|null = null;

  isLoading:boolean = false;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#3f51b5',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#666666'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance : {
      theme: 'stripe',
    }
  };

  stripeForm: FormGroup|undefined;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private ordersService: OrdersService,
    private router:Router,private snackBar: MatSnackBar) {
      this.product = this.router.getCurrentNavigation()!.extras.state as Product;
    if(this.product == null){
      this.router.navigate(['/']);
    }

    }

  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', this.cardOptions);
          this.card.mount('#card-element');
        }
      });
  }

  createToken(): void {
    this.isLoading = true;
    const name = this.stripeForm!.get('name')!.value;
    const email = this.stripeForm!.get('email')!.value;
    
    this.stripeService
      .createToken(this.card!, { name })
      .subscribe({next: (result) => {
        if (result.token) {
          this.placeOrder(this.product!.id, result.token.id, name, email);
        } else if (result.error) {
          this.snackBar.open(result.error.message??"An error occured attempting to process card details","DISMISS",{
            duration: 5000
          })
        }
      },
    });
  }

  placeOrder(productId:number,stripeToken:string,name: string, email:string){
    this.ordersService.placeOrder({
      product_id: productId,
      stripeToken: stripeToken,
      name: name,
      email: email,
    }).pipe(finalize(()=>{this.isLoading=false})).subscribe({next: (resp)=>{
      this.snackBar.open(resp.message,"DISMISS",{
        duration: 5000
      });

      this.router.navigateByUrl("/order-complete",{state: {order: resp.data}});
    }, error:(err) => {
      this.snackBar.open(err.error.error??"An error occured attempting to process order","DISMISS",{
        duration: 5000
      });
    }});
  }

}
