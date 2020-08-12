import { Component, OnInit } from '@angular/core';
import { CustmersService } from './../services/custmers.service'

@Component({
  selector: 'app-custmer-product',
  templateUrl: './custmer-product.component.html',
  styleUrls: ['./custmer-product.component.css']
})
export class CustmerFarmerComponent implements OnInit {
  farmers;
  
  constructor(private Customers:CustmersService) {
      
   }
  ngOnInit(): void {
    this.Customers.getFarmers()
    .subscribe(res => {
      this.farmers = res;
    }, err => {
      console.log(err)
    });
  }
  getProducts(index){
    const id = this.farmers[index]._id
    this.Customers.getProducts(id);
  }
}

