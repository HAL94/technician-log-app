import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SignupRequest } from 'src/app/models/http-models/http-request-models/signup-request.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  isLoading = false;
  maxDate = new Date(2000, 12, 31);
  minDate = new Date(1980, 0, 0);

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm, event: Event) {
    // event.preventDefault()

    if (form.value) {
      const authData: SignupRequest = {
        email: form.value.email,
        password: form.value.password,
        fname: form.value.firstName,
        lname: form.value.lastName,
        badgeNumber: form.value.badgeNumber
      };

      if (form.value.birthdate) {
        authData.birthDate = new Date(form.value.birthdate);
      }

      console.log(authData);
      this.authService.signup(authData);

      // return false;
    }
  }
}
