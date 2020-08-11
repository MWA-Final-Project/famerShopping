import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CustmerGuard implements CanActivate {
   constructor( private router:Router){} 
   canActivate(): boolean{
     console.log("in guard "+localStorage.getItem('role'))
     if(localStorage.getItem('role') == "custmer"){
      // this.router.navigate(['/home/custmer'])
      return true
     }else if(localStorage.getItem('role') == "farmer"){
      this.router.navigate([''])
      return false
     }else{
       return false
     }
   }
}
