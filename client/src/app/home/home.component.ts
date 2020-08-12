import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service"
import { Router } from '@angular/router';
import { RadioChangeService } from '../services/radio-change.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styles: [],


  
})
export class HomeComponent implements OnInit {

  constructor(private authServices:AuthService, private router:Router, private radioService: RadioChangeService){} 

  ngOnInit(): void {
  }

  logout(){
   this.authServices.clearStorage();
    this.router.navigate(["/signin"]);
    this.radioService.setRadio(1);
    
  }

}
