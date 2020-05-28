import { Component, OnInit } from '@angular/core';
import {Order, Product} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/product.service";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: Order[] = [];
  pSubscription: Subscription;
  dSubscription: Subscription;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.pSubscription = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    })
  }

  remove(id: string) {
    this.dSubscription = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter( order => order.id !== id);
    })
  }

  ngOnDestroy(): void {
    if (this.pSubscription) {
      this.pSubscription.unsubscribe();
    }
    if (this.dSubscription) {
      this.dSubscription.unsubscribe();
    }
  }
}
