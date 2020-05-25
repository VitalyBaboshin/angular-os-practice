import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FbCreateResponse, Product} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  create(product: Product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...product,
          id: response.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll(): Observable<Product[]> {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
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

  getById(id: string): Observable<Product> {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((product: Product) => {
        return {
          ...product,
          id,
          date: new Date(product.date)
        }
      }))
  }
}
