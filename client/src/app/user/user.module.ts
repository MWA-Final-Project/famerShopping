import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { signin1Component } from "./signin1/signin1.component";


@NgModule({
  declarations: [SignupComponent, SigninComponent, LoadingSpinnerComponent, LandingPageComponent, signin1Component],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "",component: LandingPageComponent,
          children:[
            { path: "signup",component: SignupComponent},
            { path: "signin", component: SigninComponent },
            { path: "signin1", component: signin1Component },
            { path: "", redirectTo: "signin", pathMatch: "full" }
          ]          
      }
    ])
  ]
})
export class UserModule {}