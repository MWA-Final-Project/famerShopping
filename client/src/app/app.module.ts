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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: "user", loadChildren: "./user/user.module" },
      { path: "", redirectTo: "user", pathMatch: "full" }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
