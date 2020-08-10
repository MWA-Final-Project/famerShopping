import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { RadioChangeService } from './../../services/radio-change.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string = null;
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
    console.log("Sign up page loaded");
  }

 

  ngOnInit() {}

  onSubmit() {
    if(this.radioService.getRadio()==2){
      console.log(this.radioService.getRadio());
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
    const response = this.authService.signUp(account, this.baseUrl);
   

    if (response) {
      this.isLoading = false;
      console.log(response);
    } else {
      this.error = response;
      this.isLoading = false;
    }
  }

}
