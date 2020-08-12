import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RadioChangeService } from './../../services/radio-change.service'

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isLoading: boolean = false;
  error;
  private token;
  baseUrl: string = "http://localhost:3000/farmers";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private radioService: RadioChangeService
  ) {
    this.signinForm = formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
    
  }


  onSubmit() {
    if(this.radioService.getRadio()==2){
      this.baseUrl = "http://localhost:3000/customers"
    }
    const account = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };
   
    this.isLoading = true;
    
    this.authService.signIn(account, this.baseUrl).then(response=>{
      this.isLoading = false;
    }).catch(err=>{
      this.error = err;
      this.isLoading = false;
    });
    
    
  }
}
