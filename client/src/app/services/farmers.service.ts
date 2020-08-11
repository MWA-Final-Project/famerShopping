import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmersService {

  constructor(private http: HttpClient){ }

  subject = new Subject<any>();
  private allProducts;
  private allOrders;
  getProducts() {
    const link ="http://localhost:3000/farmers/"+localStorage.getItem('id')+"/products"
    this.http.get<{products:object}>(link)
      .subscribe(res => {
        this.allProducts = res.products;
        this.subject.next(this.allProducts);
      }, err => {
        console.log(err)
      });
      return this.allProducts;
  }
  increaseProductQuantity(id) {
    const link ="http://localhost:3000/farmers/"+localStorage.getItem('id')+"/products/"+id+"/inc/";
    this.http.patch(link,id)
      .subscribe(res => {
        this.getProducts();
        return res;
      }, err => {
        console.log(err)
      });
  }
  decreseProductQuantity(id) {
    const link ="http://localhost:3000/farmers/"+localStorage.getItem('id')+"/products/"+id+"/dec/";
    this.http.patch(link,id)
      .subscribe(res => {
        this.getProducts();
        return res;
      }, err => {
        console.log(err)
      });
  }
  removeProduct(id) {
    const link ="http://localhost:3000/farmers/"+localStorage.getItem('id')+"/products/"+id;
    this.http.delete(link,id)
      .subscribe(res => {
        this.getProducts();
        return res;
      }, err => {
        console.log(err)
      });
  }
  addProduct(reqBody){
    const link ="http://localhost:3000/farmers/"+localStorage.getItem('id')+"/products";
    this.http.post<{obj:object}>(link, reqBody)
      .subscribe(res => {
        console.log("product created"+ res.obj)
        this.getProducts();
        return res;
      }, err => {
        console.log(err)
      });
  }

  getOrders() {
    const link ="http://localhost:3000/farmers/"+localStorage.getItem('id')+"/orders"
    this.http.get<{orders:object}>(link)
      .subscribe(res => {
        this.allOrders = res.orders;
        this.subject.next(this.allOrders);
      }, err => {
        console.log(err)
      });
      return this.allOrders;
  }

  changeState(id, reqBody) {
    const link ="http://localhost:3000/farmers/"+localStorage.getItem('id')+"/orders/"+id;
    this.http.patch(link,reqBody)
      .subscribe(res => {
        return res;
      }, err => {
        console.log(err)
      });
  }
}
