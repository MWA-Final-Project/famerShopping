import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RadioChangeService } from './../../services/radio-change.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error = null;
  isLoading: boolean = false;
  baseUrl: string = "http://localhost:3000/farmers";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private radioService: RadioChangeService
  ) {
    this.signupForm = formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
        ]
      ],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipcode: ["", Validators.required],
      phone: ["", Validators.required]
    });
  }

 

  ngOnInit() {}

  onSubmit() {
    if(this.radioService.getRadio()==2){
      this.baseUrl = "http://localhost:3000/custmers"
    }
    this.isLoading = true;

    const account = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      fullName:{fisrtName:this.signupForm.value.firstName, lastName:this.signupForm.value.lastName},
      address:{street:this.signupForm.value.street, city:this.signupForm.value.city, state:this.signupForm.value.state, zipcode:this.signupForm.value.zipcode},
      phone: this.signupForm.value.phone
    };
    
    

    this.isLoading = true;
    this.authService.signUp(account, this.baseUrl).then(response=>{
      if (response=="MongoError") {
        
        
      } else {
        this.isLoading = false;
      }
    }).catch(err=>{
      this.error = err;
      this.isLoading = false;
    });


  }

}
