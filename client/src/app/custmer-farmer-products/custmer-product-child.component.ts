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
    console.log(this.Customers.getSavedProducts());
    this.products = this.Customers.getSavedProducts();
    
  }

  ngOnInit(): void {
    
  }

}
