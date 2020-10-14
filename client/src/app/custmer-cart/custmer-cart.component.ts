import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustmersService } from './../services/custmers.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custmer-cart',
  templateUrl: './custmer-cart.component.html',
  styleUrls: ['./custmer-cart.component.css']
})
export class CustmerCartComponent implements OnInit, OnDestroy {
  subscription :Subscription;
  cart;
 
  constructor(private Customers:CustmersService) { 
    this.Customers.getCart();
  }

  ngOnInit(): void {
    this.subscription = this.Customers.cart$.subscribe(cart => {
        this.cart = cart;
    });
  }
  checkOut(){
    this.Customers.checkOut();
  }
  remove(index){
    const id = this.cart[index]._id;
    this.Customers.removeFromCart(id);
  }
  increaseQuantity(index){
    const id = this.cart[index]._id;
    const price = {"price":this.cart[index].price};
    this.Customers.increaseOrdersQuantity(id, price);
    
  }
  decreaseQuantity(index){
    const id = this.cart[index]._id;
    const price = {"price":this.cart[index].price};
    this.Customers.decreseOrdersQuantity(id, price);
  }
  ngOnDestroy(){

    this.subscription.unsubscribe();
    console.log("destroyed")
  }

}
