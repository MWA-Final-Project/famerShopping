import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule } from "@angular/router";
import { UserModule } from "./user/user.module";
import { MaterialModule } from "./material/material.module";
//import { LoadingSpinnerComponent } from "./user/loading-spinner/loading-spinner.component.js";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth-interceptor";
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './/guards/auth.guard';
import { FarmerComponent } from './farmer/farmer.component';
import { FarmerProductsComponent } from './farmer-products/farmer-products.component';
import { FarmerOrderssComponent } from './farmer-orderss/farmer-orderss.component';
import { CustomersComponent } from './customers/customers.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustmerFarmerComponent } from './custmer-farmers/custmer-product.component';
import { CustmerOrdersComponent } from './custmer-orders/custmer-orders.component';
import { CustmerCartComponent } from './custmer-cart/custmer-cart.component';
import { FarmerGuard } from './guards/farmer.guard';
import { CustmerGuard } from './guards/custmer.guard';
import { CustmersFarmerProductsComponent } from './custmer-farmer-products/custmer-product-child.component';


@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    FarmerComponent, 
    FarmerProductsComponent, 
    FarmerOrderssComponent, 
    CustomersComponent, 
    FooterComponent,
     HeaderComponent, 
     CustmerFarmerComponent, 
     CustmerOrdersComponent, 
     CustmerCartComponent, 
     CustmersFarmerProductsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot([
      {path:"home", component: HomeComponent, canActivate:[AuthGuard],
        children:[
          { path: "farmer",component: FarmerComponent,canActivate:[FarmerGuard],
            children:[
              { path: "products",component: FarmerProductsComponent},
              { path: "orders",component: FarmerOrderssComponent},
              { path: "", redirectTo: "products", pathMatch: "full" }
            ] 
          },
          { path: "custmer", component: CustomersComponent,canActivate:[CustmerGuard], 
          children:[
            { path: "farmers",component: CustmerFarmerComponent},
            { path: "orders",component: CustmerOrdersComponent},
            { path: "cart",component: CustmerCartComponent},
            { path: "farmer-prducts",component: CustmersFarmerProductsComponent},
            { path: "", redirectTo: "farmers", pathMatch: "full" }
          ] 
        },
          { path: "", redirectTo: "home", pathMatch: "full" }
        ] 

      },
      { path: "user", loadChildren: "./user/user.module" },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home", pathMatch: "full" },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard, FarmerGuard, CustmerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
