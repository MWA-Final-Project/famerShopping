import { Component, OnInit } from '@angular/core';
import { FarmersService } from './../services/farmers.service'

@Component({
  selector: 'app-farmer-orderss',
  templateUrl: './farmer-orderss.component.html',
  styleUrls: ['./farmer-orderss.component.css']
})
export class FarmerOrderssComponent implements OnInit {
  orders;
  constructor(private Farmers: FarmersService) { 
    this.Farmers.getOrders();
  }
  ngOnInit(){
    
      this.Farmers.subject.subscribe(orders => {
        if (!this.orders) {
          this.orders = orders;
          console.log(this.Farmers.getOrders());
        }
      });
  }
  deleteOrder(index){
    console.log(this.orders[index]._id)
    const id = this.orders[index]._id
    this.Farmers.removeProduct(id);
  }
  
}
