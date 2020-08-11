import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";
import { RadioChangeService } from './../../services/radio-change.service'

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;
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

    const response = this.authService.signIn(account, this.baseUrl);
    
    this.error = this.authService.getErrorMessage();
    if (response) {
      this.isLoading = false;
    } else {
      this.error = response;
      this.isLoading = false;
    }
  }
}
