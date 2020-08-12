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
  errorMessage: string = null;

  

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage(){
    localStorage.clear();
  }
 
  
 
  signIn(account,baseUrl) {
    return new Promise ((resolve, reject)=>{
      this.http
      .post<{ token: string, 
              role: string,
              email:string
              id:string,
              firstName:string,
              lastName: string }>(baseUrl + "/signin", account)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('token',response.token)
        localStorage.setItem('id',response.id)
        localStorage.setItem('firstName',response.firstName);
        localStorage.setItem('lastName',response.lastName);
        localStorage.setItem('email',response.email);
        localStorage.setItem('role',response.role);
        
        if(response.role == "farmer"){
          this.router.navigate(["home","farmer"])
        }else{
          this.router.navigate(["home","custmer"])
        }
        resolve(response);
      }, err => {
        reject(err.error.message);
        
      });
    })

    
  }
  signUp(account, baseUrl) {

    return new Promise ((resolve, reject)=>{
      this.http.post(baseUrl + "/signup", account).subscribe(response => {
        this.router.navigate(["/signin"])
        resolve(response);
      }, err => {
        
        reject( err.error.message.name)
      });
    })
  }
  getErrorMessage() {
    return this.errorMessage;
  }
}
