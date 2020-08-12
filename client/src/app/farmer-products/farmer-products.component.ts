import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
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
    
  @ViewChild('avatarFile') mypic: ElementRef;
  selectedimage: File = null;


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
      quantity: ["1", Validators.required],
      avatar:[""]
    });
    
  }
  ngOnInit(){
      this.Farmers.subject.subscribe(products => {
          this.products = products;
      });
  }
  increaseQuantity(index){
    const id = this.products[index]._id
    this.Farmers.increaseProductQuantity(id);
  }
  decreaseQuantity(index){
    const id = this.products[index]._id
    this.Farmers.decreseProductQuantity(id);
  }
  deleteProduct(index){
    const id = this.products[index]._id
    this.Farmers.removeProduct(id);
  }
  onSubmit() {
    const fd = new FormData();
    //this.selectedimage = <File>this.mypic.nativeElement.files[0];
   // fd.append('image', this.selectedimage, this.selectedimage.name);
    fd.append('name', this.proudctForm.value.name);
    fd.append('description', this.proudctForm.value.description );
    fd.append('price', this.proudctForm.value.price);
    fd.append('category', this.proudctForm.value.catogry);
    fd.append('quantity', this.proudctForm.value.quantity);
    fd.append('pushing_date', this.currentDate.toDateString());
    fd.append('pic', this.mypic.nativeElement.files[0]);

 /*   const product = {
      name: this.proudctForm.value.name,
      description: this.proudctForm.value.description,
      price: this.proudctForm.value.price,
     // pic:this.mypic.nativeElement.files,
     pic:fd,
      catagory: this.proudctForm.value.catogry,
      quantity: this.proudctForm.value.quantity,
      pushing_date: this.currentDate
    };*/
    console.log(fd)
    this.Farmers.addProduct(fd);
  
   
  }
  
}
