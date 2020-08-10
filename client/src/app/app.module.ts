import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule } from "@angular/router";
import { UserModule } from "./user/user.module";
import { MaterialModule } from "./material/material.module";
//import { LoadingSpinnerComponent } from "./user/loading-spinner/loading-spinner.component.js";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./user/auth-interceptor";
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './/guards/auth.guard';
import { FarmerComponent } from './farmer/farmer.component';
import { FarmerProductsComponent } from './farmer-products/farmer-products.component';
import { FarmerOrderssComponent } from './farmer-orderss/farmer-orderss.component';
import { CustomersComponent } from './customers/customers.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, FarmerComponent, FarmerProductsComponent, FarmerOrderssComponent, CustomersComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    MaterialModule,
    RouterModule.forRoot([
      {path:"home", component: HomeComponent, canActivate:[AuthGuard],
        children:[
          { path: "farmer",component: FarmerComponent,
            children:[
              { path: "products",component: FarmerProductsComponent},
              { path: "orders",component: FarmerOrderssComponent},
              { path: "", redirectTo: "products", pathMatch: "full" }
            ] 
          },
          { path: "custmer", component: CustomersComponent },
          { path: "", redirectTo: "farmer", pathMatch: "full" }
        ] 

      },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home", pathMatch: "full" },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
