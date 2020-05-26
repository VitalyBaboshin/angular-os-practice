import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Product} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  pSubscription: Subscription;
  dSubscription: Subscription;
  productName: string;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.pSubscription = this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }

  remove(id: string) {
    this.dSubscription = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter( product => product.id !== id);
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
