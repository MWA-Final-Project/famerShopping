import { Component, OnInit } from '@angular/core';
import { RadioChangeService } from './../../services/radio-change.service'
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private radioService: RadioChangeService) {
    
   }
   radioChange(event: MatRadioChange) {
    if(event.value==2){
      this.radioService.setRadio(2);
    }
    
  }
  
  ngOnInit(): void {
  }

}
