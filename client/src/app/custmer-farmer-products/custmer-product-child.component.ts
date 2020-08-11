import { Component, OnInit } from '@angular/core';
import { CustmersService } from './../services/custmers.service'

@Component({
  selector: 'app-custmer-product-child',
  templateUrl: './custmer-product-child.component.html',
  styleUrls: ['./custmer-product-child.component.css']
})
export class CustmersFarmerProductsComponent implements OnInit {
  products;

  constructor(private Customers:CustmersService) { 
    this.products = this.Customers.getSavedProducts();
  }

  ngOnInit(): void {
    this.Customers.products$.subscribe(res=>{
      this.products = this.Customers.getSavedProducts();
    })
    
  }
  addProductToCart(index){
    const id = this.products[index]._id;
    this.Customers.addToCart(id)
  }
  checkOut(){
    this.Customers.checkOut();
  }

}
