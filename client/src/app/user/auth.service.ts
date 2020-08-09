
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

  loginbaseUrl: string = "http://localhost:3000/custmers";

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  signIn(account,baseUrl) {
    this.http
      .post<{ token: string }>(baseUrl + "/signin", account)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.responseMessage = response;

        this.router.navigate(["/home"])
      });

    return this.responseMessage;
  }
  signUp(account, baseUrl) {
    this.http.post(baseUrl + "/signup", account).subscribe(response => {
      console.log(response);
      this.responseMessage = response;
    });
    return this.responseMessage;
  }
}
