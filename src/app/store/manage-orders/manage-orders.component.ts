import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PaginatedResponse } from 'src/app/shared/models/paginated-response.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

  isLoadingCustomer = true;
  displayedColumns: string[] = ['order_number','customer_name','customer_email','product_name', 'amount',"status"];
  page = 0;
  pageSize = 50;
  totalElements = 0;
  isLoading = true;
  orderList: PaginatedResponse<Order> | null = null;

  constructor(private orderService: OrdersService, private snackBar:MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrderList();
  }


  handlePageChange(event:any): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getOrderList();
  }

  getOrderList(): void {
    this.orderList = null;
    this.isLoading = true;
    const params = {page: this.page, size: this.pageSize};

    this.orderService.getUserOrders(params).subscribe({next: (orders:PaginatedResponse<Order>) => {
      this.orderList = orders;
      this.page = orders.current_page;
      this.totalElements = orders.total;
      this.isLoading = false;
    },error: (err) => {
      this.snackBar.open(`Failed to load order list.`, 'Dismiss', {
        duration: 5000,
      });
      this.isLoading = false;
    },});
  }

}
