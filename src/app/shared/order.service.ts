import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FbCreateResponse, Order, Product} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  create(order: Order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...order,
          id: response.name,
          date: new Date(order.date)
        }
      }))
  }

  getAll(): Observable<Order[]> {
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/orders/${id}.json`);
  }

}
