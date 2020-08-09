import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../user/auth.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styles: [],
  
})
export class HomeComponent implements OnInit {

  constructor(private authServices:AuthService, private router:Router){} 

  ngOnInit(): void {
  }

  logout(){
   this.authServices.clearStorage();
    this.router.navigate(["/signin"])
  }

}
