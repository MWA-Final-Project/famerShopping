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
import { Home1Component } from './home1/home1.component';
import { Home2Component } from './home2/home2.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, Home1Component, Home2Component],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    MaterialModule,
    RouterModule.forRoot([
      {path:"home", component: HomeComponent},
      {path:"home1", component: Home1Component},
      {path:"home2", component: Home2Component},
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path:"home", component: HomeComponent},
      { path: "user", loadChildren: "./user/user.module" },
      { path: "**", redirectTo: "home", pathMatch: "full" }
      
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
