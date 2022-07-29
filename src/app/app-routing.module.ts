import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { BasePageComponent } from './store/base-page/base-page.component';
import { HomeComponent } from './store/home/home.component';
import { LoginPageComponent } from './store/login-page/login-page.component';
import { MakePaymentPageComponent } from './store/make-payment-page/make-payment-page.component';
import { ManageOrdersComponent } from './store/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './store/manage-products/manage-products.component';
import { OrderCompletePageComponent } from './store/order-complete-page/order-complete-page.component';
import { ProductPageComponent } from './store/product-page/product-page.component';

const routes: Routes = [
  
  {
    path:'',
    component: BasePageComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'product/:id',
        component: ProductPageComponent
      },
      {
        path: 'manage-products',
        component: ManageProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-orders',
        component: ManageOrdersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'make-payments',
        component: MakePaymentPageComponent
      },
      {
        path: 'order-complete',
        component: OrderCompletePageComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
