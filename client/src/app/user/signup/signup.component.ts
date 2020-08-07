import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string = null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
      password: ["", Validators.required]
    });
    console.log("Sign up page loaded");
  }

  ngOnInit() {}

  onSubmit() {
    this.isLoading = true;
    const account = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };

    //this.isLoading = true;
    const response = this.authService.signUp(account);

    if (response) {
      this.isLoading = false;
      console.log(response);
    } else {
      this.error = response;
      this.isLoading = false;
    }
  }

}
