import { Component, OnInit } from '@angular/core';
import { FarmersService } from './../services/farmers.service'

@Component({
  selector: 'app-farmer-orderss',
  templateUrl: './farmer-orderss.component.html',
  styleUrls: ['./farmer-orderss.component.css']
})
export class FarmerOrderssComponent implements OnInit {
  orders;
  complete = "Complete"
  constructor(private Farmers: FarmersService) { 
    this.Farmers.getOrders();
  }
  ngOnInit(){
      this.Farmers.subject.subscribe(orders => {
          this.orders = orders;      
      });
  }
  deleteOrder(index){
    const id = this.orders[index]._id
    this.Farmers.removeProduct(id);
  }
  changeStatus(event,index){
    const statusBody ={
      "status": event.value
    }
    const id = this.orders[index]._id;
    this.Farmers.changeState(id,statusBody);
  }
}
