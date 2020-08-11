import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustmersService {

  constructor(private http:HttpClient) { }
  subject = new Subject<any>();
  private allFarmers;
  private allProducts;
  private allOrders;

  getSavedProducts(){
    return this.allProducts;
  }

  getFarmers() {
    const link ="http://localhost:3000/farmers/"
    console.log("i'm in get farmers");
    this.http.get<{farmers:Array<object>}>(link)
      .subscribe(res => {
        
        this.allFarmers = res;
        console.log("i'm in get farmers then" + this.allFarmers );
      }, err => {
        console.log(err)
      });
      return this.allFarmers;
  }
  getProducts(farmerId) {
    const link ="http://localhost:3000/farmers/"+farmerId+"/products"
    this.http.get<{products:object}>(link)
      .subscribe(res => {
        this.allProducts = res.products;
        // this.subject.next(this.allProducts);
        console.log( this.allProducts );
      }, err => {
        console.log(err)
      });
      return this.allProducts;
  }

  getOrders() {
    const link ="http://localhost:3000/customers/"+localStorage.getItem('id')+"/orders"
    this.http.get<{orders:object}>(link)
      .subscribe(res => {
        this.allOrders = res.orders;
        this.subject.next(this.allOrders);
      }, err => {
        console.log(err)
      });
      return this.allOrders;
  }
  removeOrder(id) {
    const link ="http://localhost:3000/customers/"+localStorage.getItem('id')+"/order/"+id;
    this.http.delete(link,id)
      .subscribe(res => {
        return res;
      }, err => {
        console.log(err)
      });
  }
}
