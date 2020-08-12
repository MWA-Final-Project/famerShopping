import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service"

@Injectable({
  providedIn: 'root'
})
export class VoidSignInGuard implements CanActivate {
   constructor(private authServices:AuthService, private router:Router){} 
   canActivate(): boolean{
    if(! this.authServices.getToken()){
      return true;
    }else{
      this.router.navigate(['/home'])
      return false
    }
   }
}