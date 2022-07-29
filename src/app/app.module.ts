import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxStripeModule } from 'ngx-stripe';


import { AppComponent } from './app.component';
import { HomeComponent } from './store/home/home.component';
import { ProductPageComponent } from './store/product-page/product-page.component';
import { LoginPageComponent } from './store/login-page/login-page.component';
import { BasePageComponent } from './store/base-page/base-page.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpXsrfInterceptor } from './shared/interceptors/http-xsrf-interceptor.interceptor';
import { ManageProductsComponent } from './store/manage-products/manage-products.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ManageProductDialogComponent } from './shared/components/manage-product-dialog/manage-product-dialog.component';
import { DeleteProductDialogComponent } from './shared/components/delete-product-dialog/delete-product-dialog.component';
import { MakePaymentPageComponent } from './store/make-payment-page/make-payment-page.component';
import { OrderCompletePageComponent } from './store/order-complete-page/order-complete-page.component';
import { ManageOrdersComponent } from './store/manage-orders/manage-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductPageComponent,
    LoginPageComponent,
    BasePageComponent,
    ProductCardComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ManageProductDialogComponent,
    DeleteProductDialogComponent,
    MakePaymentPageComponent,
    OrderCompletePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxStripeModule.forRoot("pk_UvqMDHKJx42Y8ur7fo6rO2ygNQkH0"),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXsrfInterceptor,
      multi: true,
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
