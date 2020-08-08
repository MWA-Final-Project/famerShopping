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
import { HomeComponent} from "./../home/home.component"

@NgModule({
  declarations: [SignupComponent, SigninComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "signup",
        component: SignupComponent
      },
      { path: "signin", component: SigninComponent },
      { path: "", redirectTo: "signup", pathMatch: "full" }
    ])
  ]
})
export class UserModule {}