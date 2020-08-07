import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    const account = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };
    this.isLoading = true;

    const response = this.authService.signIn(account);

    if (response) {
      this.isLoading = false;
      console.log(response);
    } else {
      this.error = response;
      this.isLoading = false;
    }
  }
}
