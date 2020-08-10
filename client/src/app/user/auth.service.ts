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

  

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem('token');
  }
    clearStorage(){
    localStorage.clear();
  }
  signIn(account,baseUrl) {
    this.http
      .post<{ token: string, 
              role: string,
              email:string
              id:string,
              firstName:string,
              lastName: string }>(baseUrl + "/signin", account)
      .subscribe(response => {
        console.log(response)
        const token = response.token;
        localStorage.setItem('token',response.token)
        localStorage.setItem('id',response.id)
        localStorage.setItem('firstName',response.firstName);
        localStorage.setItem('lastName',response.lastName);
        localStorage.setItem('email',response.email);
        
        
        this.responseMessage = response;
        if(response.role == "farmer"){
          
            this.router.navigate(["/home/farmer"])
        }else{
          console.log("I'm ay 7aga")
          this.router.navigate(["/home/custmer"])
        }
      }, err => {
        console.log(err.error.message)
      });

    return this.responseMessage;
  }
  signUp(account, baseUrl) {
    this.http.post(baseUrl + "/signup", account).subscribe(response => {
      console.log(response);
      this.responseMessage = response;
      this.router.navigate(["/signin"])
    });
    return this.responseMessage;
  }
}
