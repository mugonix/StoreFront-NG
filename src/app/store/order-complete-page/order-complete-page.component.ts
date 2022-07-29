import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-order-complete-page',
  templateUrl: './order-complete-page.component.html',
  styleUrls: ['./order-complete-page.component.scss']
})
export class OrderCompletePageComponent implements OnInit {

  order: Order|null = null;

  constructor(private router:Router) { 
    this.order = this.router.getCurrentNavigation()!.extras.state!["order"] as Order;
    if(this.order == null){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
