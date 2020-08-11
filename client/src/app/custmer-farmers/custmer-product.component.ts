import { Component, OnInit } from '@angular/core';
import { CustmersService } from './../services/custmers.service'

@Component({
  selector: 'app-custmer-product',
  templateUrl: './custmer-product.component.html',
  styleUrls: ['./custmer-product.component.css']
})
export class CustmerFarmerComponent implements OnInit {
  products;
  farmers;

  constructor(private Customers:CustmersService) {
   }

  ngOnInit(): void {
    this.farmers = this.Customers.getFarmers();
    console.log(this.Customers.getFarmers());
  }

  getProducts(index){
    console.log(this.farmers[index]._id)
    const id = this.farmers[index]._id
    this.Customers.getProducts(id);
  }

}

