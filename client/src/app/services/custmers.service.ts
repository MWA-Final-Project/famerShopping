import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustmersService {

  constructor(private http:HttpClient) { }
  subject = new Subject<any>();
  cart$ = new Subject<any>();
  orders$ = new Subject<any>();
  farmers$ = new Subject<any>();
  products$ = new Subject<any>();

  private allFarmers;
  private allProducts;
  private allOrders;
  

  baseCustmersURL = "http://localhost:3000/customers/";
  baseFarmersURL ="http://localhost:3000/farmers/";

  getSavedProducts(){
    return this.allProducts;
  }

  getFarmers(): Observable<any> {
    const link =this.baseFarmersURL
    return this.http.get(link);
      // .subscribe(res => {
      //   this.allFarmers = res;
      //   this.farmers$.next(this.allOrders);
      //   console.log("get farmers")
      //   //console.log("i'm in get farmers then" + this.allFarmers );
      // }, err => {
      //   console.log(err)
      // });
      // return this.allFarmers;
  }
  getProducts(farmerId) {
    const link = this.baseFarmersURL+farmerId+"/products"
    this.http.get<{products:object}>(link)
      .subscribe(res => {
        this.allProducts = res.products;
        this.products$.next(this.allProducts);
      }, err => {
        console.log(err)
      });
      return this.allProducts;
  }

  getOrders() {
    const link =this.baseCustmersURL+localStorage.getItem('id')+"/orders"
    this.http.get<{orders:object}>(link)
      .subscribe(res => {
        this.allOrders = res.orders;
        this.orders$.next(this.allOrders);
      }, err => {
        console.log(err)
      });
      return this.allOrders;
  }
  removeOrder(id) {
    const link =this.baseCustmersURL +localStorage.getItem('id')+"/order/"+id;
    this.http.delete(link,id)
      .subscribe(res => {
        return res;
      }, err => {
        console.log(err)
      });
  }

  getCart(){
    const link =this.baseCustmersURL +localStorage.getItem('id')+"/cart"
    this.http.get<{cart:object}>(link)
      .subscribe(res => {
        this.cart$.next(res.cart);
        return res.cart;
      }, err => {
        console.log(err)
        return err;
      });
      
  }
  
  addToCart(id){
    const link =this.baseCustmersURL+localStorage.getItem('id')+"/cart/"+id
    this.http.patch(link, id)
      .subscribe(res => {
      }, err => {
        console.log(err)
      });
      return "added";
  }

  checkOut(){
    const link =this.baseCustmersURL +localStorage.getItem('id')+"/checkout"
    this.http.post(link,null)
      .subscribe(res => {
        this.getCart();
        return res
      }, err => {
        console.log(err)
      });
      return "checked out";
  }
  
  removeFromCart(orderId){
    const link =this.baseCustmersURL +localStorage.getItem('id')+"/cart/"+orderId
    this.http.delete(link,{})
      .subscribe(res => {
        this.getCart();
        return res
      }, err => {
        console.log(err)
      });
      return "deleted from cart out";
  }

  cancelOrder(orderId){
    const link =this.baseCustmersURL +localStorage.getItem('id')+"/orders/"+orderId
    this.http.delete(link,{})
      .subscribe(res => {
        this.getOrders();
        return res
      }, err => {
        console.log(err)
      });
      return "canceled your order";
  }

  increaseOrdersQuantity(id, price) {
    const link =this.baseCustmersURL+localStorage.getItem('id')+"/cart/orders/"+id+"/inc";
    this.http.patch(link,price)
      .subscribe(res => {
        this.getCart();
        return res;
      }, err => {
        console.log(err)
      });
  }
  decreseOrdersQuantity(id, price) {
    const link =this.baseCustmersURL+localStorage.getItem('id')+"/cart/orders/"+id+"/dec";
    this.http.patch(link,price)
      .subscribe(res => {
        this.getCart();
        return res;
      }, err => {
        console.log(err)
      });
  }
  changeState(id, reqBody) {
    const link =this.baseCustmersURL+localStorage.getItem('id')+"/orders/"+id;
    this.http.patch(link,reqBody)
      .subscribe(res => {
        return res;
      }, err => {
        console.log(err)
      });
  }
  rateOrder(orderId, rateValue){
    const link =this.baseCustmersURL+localStorage.getItem('id')+"/orders/"+orderId+"/rate/"+rateValue;
    this.http.post(link,{})
      .subscribe(res => {
        this.getOrders();
        return res;
      }, err => {
        console.log(err)
      });
  }
  SortedOrders(status){
    const link =this.baseCustmersURL+localStorage.getItem('id')+"/orders/"+status;
    this.http.get(link,{})
      .subscribe(res => {
        this.getOrders();
        return res;
      }, err => {
        console.log(err)
      });
  }

}
