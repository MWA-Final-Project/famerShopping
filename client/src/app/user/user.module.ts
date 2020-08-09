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
import { LandingPageComponent } from './landing-page/landing-page.component'
import { VoidSignInGuard } from './../guards/void-sign-in.guard';

@NgModule({
  declarations: [SignupComponent, SigninComponent, LoadingSpinnerComponent, LandingPageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "",component: LandingPageComponent,
          children:[
            { path: "signup",component: SignupComponent , canActivate:[VoidSignInGuard]},
            { path: "signin", component: SigninComponent, canActivate:[VoidSignInGuard] },
            { path: "", redirectTo: "signin", pathMatch: "full" }
          ]          
      }
    ])
  ]
})
export class UserModule {}