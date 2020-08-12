import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RadioChangeService } from './../../services/radio-change.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('avatarFile') avatarFile;
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
      phone: ["", Validators.required],
      files: this.formBuilder.group({
        avatar: [null],
      })
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
    
    const formData = new FormData();

    Object.keys(this.signupForm.value).forEach(key => {
      if (key != "files") {
        formData.append(key, this.signupForm.value[key]);
      }
    });

    console.log(this.avatarFile.nativeElement.files[0].name);
    formData.append('avatar', this.avatarFile.nativeElement.files[0], this.avatarFile.nativeElement.files[0].name);
    

    this.isLoading = true;
    const response = this.authService.signUp(account, this.baseUrl);

    if (response=="MongoError") {
      this.error = response;
      this.isLoading = false;
      
    } else {
      this.isLoading = false;
    }

    console.log(this.signupForm.value)
  }

}
