import { Component, OnInit } from '@angular/core';
import { CustmersService } from './../services/custmers.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-custmer-orders',
  templateUrl: './custmer-orders.component.html',
  styleUrls: ['./custmer-orders.component.css']
})
export class CustmerOrdersComponent implements OnInit {
  orders;
  complete = "Complete";
  radioOrderId;
  rate;
  

  constructor(private Customers: CustmersService) {
    this.Customers.getOrders();
  }

  ngOnInit(): void {
    this.Customers.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }
  cancelOrder(index) {
    const id = this.orders[index]._id;
    this.Customers.cancelOrder(id);
  }
  radioChange(event: MatRadioChange, index) {
    this.radioOrderId = this.orders[index]._id;
    this.rate = event.value;
    this.Customers.rateOrder(this.radioOrderId, this.rate);
  }
  sortBy(event){
    this.Customers.SortedOrders(event.value);
  }

}