import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service"
import { Router } from '@angular/router';
import { RadioChangeService } from '../services/radio-change.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  
  logedInUser=localStorage.getItem('role');
  custmerStatus= false;
  constructor(private authServices:AuthService, private router:Router, private radioService: RadioChangeService){} 



  ngOnInit(): void {
    this.user = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
    {
      if(localStorage.getItem('role')=="custmer"){
        this.custmerStatus = true;
      }
      
    }
  }

  logout(){
    this.authServices.clearStorage();
     this.router.navigate(["/signin"]);
     this.radioService.setRadio(1);
     
   }
}
