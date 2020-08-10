import { Component, OnInit } from '@angular/core';
import { FarmersService } from './../services/farmers.service'

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent  {

  constructor(private Farmers: FarmersService) { }
  
 
}
