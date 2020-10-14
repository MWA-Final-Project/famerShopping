import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private authServices:AuthService, private router:Router){} 
   canActivate(): boolean{
     if(this.authServices.getToken() != undefined && this.authServices.getToken() !=null && this.authServices.getToken().length >=0){
      return true
     }else{
      this.router.navigate(['signin'])
      return false
     }
   }
}
 