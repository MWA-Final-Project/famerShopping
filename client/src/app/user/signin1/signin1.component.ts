import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";
import { RadioChangeService } from './../../services/radio-change.service'

@Component({
  selector: 'app-signin1',
  templateUrl: './signin1.component.html',
  styleUrls: ['./signin1.component.css']
})
export class signin1Component implements OnInit {
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
    console.log("Sign up page loaded");
  }

  ngOnInit() {}

  onSubmit() {
    if(this.radioService.getRadio()==2){
      console.log(this.radioService.getRadio());
      this.baseUrl = "http://localhost:3000/custmers"
    }
    const account = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };
    this.isLoading = true;

    const response = this.authService.signIn(account, this.baseUrl);

    if (response) {
      this.isLoading = false;
      console.log(response);
    } else {
      this.error = response;
      this.isLoading = false;
    }
  }
}
