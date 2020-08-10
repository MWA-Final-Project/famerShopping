import { Component, OnInit } from '@angular/core';
import { FarmersService } from './../services/farmers.service'

@Component({
  selector: 'app-farmer-products',
  templateUrl: './farmer-products.component.html',
  styleUrls: ['./farmer-products.component.css']
})
export class FarmerProductsComponent implements OnInit {
  products;
  constructor(private Farmers: FarmersService) { 
    this.Farmers.getProducts();
  }
  ngOnInit(){
    
      this.Farmers.subject.subscribe(products => {
        if (!this.products) {
          this.products = products;
          console.log(this.Farmers.getProducts());
        }
      });
  }
  increaseQuantity(index){
    console.log(this.products[index]._id)
    const id = this.products[index]._id
    this.Farmers.increaseProductQuantity(id);
  }
  decreaseQuantity(index){
    console.log(this.products[index]._id)
    const id = this.products[index]._id
    this.Farmers.decreseProductQuantity(id);
  }
  deleteProduct(index){
    console.log(this.products[index]._id)
    const id = this.products[index]._id
    this.Farmers.removeProduct(id);
  }
  
}
