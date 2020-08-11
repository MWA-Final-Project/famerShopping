import { Component, OnInit } from '@angular/core';
import { CustmersService } from './../services/custmers.service'

@Component({
  selector: 'app-custmer-cart',
  templateUrl: './custmer-cart.component.html',
  styleUrls: ['./custmer-cart.component.css']
})
export class CustmerCartComponent implements OnInit {
  cart;
 
  constructor(private Customers:CustmersService) { 
    console.log(this.Customers.getCart())
    this.Customers.getCart();
  }

  ngOnInit(): void {
    this.Customers.cart$.subscribe(cart => {
      this.cart = cart;
  });
  }
  checkOut(){
    console.log("checked out")
    this.Customers.checkOut();
  }
  remove(index){
    const id = this.cart[index]._id;
    console.log(index, id)
    this.Customers.removeFromCart(id);
  }
  increaseQuantity(index){
    console.log(this.cart[index]._id)
    const id = this.cart[index]._id
    this.Customers.increaseProductQuantity(id);
  }
  decreaseQuantity(index){
    console.log(this.cart[index]._id)
    const id = this.cart[index]._id
    this.Customers.decreseProductQuantity(id);
  }
  changeStatus(event,index){
    const statusBody ={
      "status": event.value
    }
    const id = this.cart[index]._id;
    this.Customers.changeState(id,statusBody);
  }

}
