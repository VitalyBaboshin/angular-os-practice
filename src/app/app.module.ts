import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {QuillModule} from "ngx-quill";
import {AuthInterceptor} from "./shared/auth.interceptor";
import { ProductComponent } from './shared/components/product/product.component';
import { SortingPipe } from './shared/sorting.pipe';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}
@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        MainPageComponent,
        ProductPageComponent,
        CartPageComponent,
        ProductComponent,
        SortingPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        QuillModule.forRoot()
    ],
    providers: [INTERCEPTOR_PROVIDER],
    bootstrap: [AppComponent]
})
export class AppModule { }
