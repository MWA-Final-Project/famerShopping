
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

export interface AuthResponseData {
  email: string;

  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private responseMessage;

  baseUrl: string = "http://localhost:3000/account";

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  signIn(account) {
    this.http
      .post<{ token: string }>(this.baseUrl + "/signin", account)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.responseMessage = response;

        this.router.navigate(["/home"])
      });

    return this.responseMessage;
  }
  signUp(account) {
    this.http.post(this.baseUrl + "/signup", account).subscribe(response => {
      console.log(response);
      this.responseMessage = response;
    });
    return this.responseMessage;
  }
}
