import { Component, OnInit } from '@angular/core';
import { CustmersService } from './../services/custmers.service'

@Component({
  selector: 'app-custmer-orders',
  templateUrl: './custmer-orders.component.html',
  styleUrls: ['./custmer-orders.component.css']
})
export class CustmerOrdersComponent implements OnInit {
  orders;
  complete="complete";
  constructor(private Customers:CustmersService) { 
    console.log(this.Customers.getOrders())
    this.Customers.getOrders();
  }

  ngOnInit(): void {
    
    this.Customers.orders$.subscribe(orders => {
      
      this.orders = orders;
   
  });
  }
  cancelOrder(index){
    const id = this.orders[index]._id;
    console.log(index, id)
    this.Customers.cancelOrder(id);
  }

}
