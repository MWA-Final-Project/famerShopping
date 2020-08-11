import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { FarmersService } from './../services/farmers.service'

@Component({
  selector: 'app-farmer-products',
  templateUrl: './farmer-products.component.html',
  styleUrls: ['./farmer-products.component.css'],
  providers: [DatePipe]
})
export class FarmerProductsComponent implements OnInit {
  proudctForm: FormGroup;
  products;
  currentDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private Farmers: FarmersService,
    private datePipe: DatePipe
    ) { 
    this.Farmers.getProducts();
    // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.proudctForm = formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      price: ["0", Validators.required],
      catogry: ["", Validators.required],
      quantity: ["1", Validators.required]
    });
    
    
  }
  ngOnInit(){
      this.Farmers.subject.subscribe(products => {
          this.products = products;
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
  onSubmit() {
    const product = {
      name: this.proudctForm.value.name,
      description: this.proudctForm.value.description,
      price: this.proudctForm.value.price,
      pic:"mostafa",
      catagory: this.proudctForm.value.catogry,
      quantity: this.proudctForm.value.quantity,
      pushing_date: this.currentDate
    };
    console.log(product)
    this.Farmers.addProduct(product);
  
   
  }
  
}
