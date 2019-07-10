import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  maxDate = new Date(2000, 12, 31);
  minDate = new Date(1980, 0, 0);

  private user: User;
  private subscription: Subscription;
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.initForm();
    const userLoc = this.userService.getUser();
    if (userLoc) {
      this.setForm(userLoc);
      this.user = userLoc;
    }
    this.subscription = this.userService.getUserUpdate().subscribe(user => {
      this.user = user;
      // console.log(this.user);
      this.setForm(user);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setForm(user: User) {
    this.profileForm = this.fb.group({
      fname: new FormControl(user.fname, [ Validators.required ]),
      lname: new FormControl(user.lname, [ Validators.required ]),
      badgeNumber: new FormControl(user.badgeNumber, [Validators.required]),
      address: new FormControl(user.address),
      city: new FormControl(user.city),
      postalCode: new FormControl(user.postalCode),
      country: new FormControl(user.country),
      aboutUser: new FormControl(user.aboutUser),
      birthDate: new FormControl(user.birthDate)
    });
  }

  initForm() {
    this.profileForm = this.fb.group({
      fname: new FormControl('', [ Validators.required ]),
      lname: new FormControl('', [ Validators.required ]),
      badgeNumber: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl(''),
      country: new FormControl(''),
      aboutUser: new FormControl(''),
      birthDate: new FormControl('')
    });
  }
  onSubmit() {
    this.user.fname = this.profileForm.get('fname').value;
    this.user.lname = this.profileForm.get('lname').value;
    this.user.badgeNumber = this.profileForm.get('badgeNumber').value;
    this.user.address = this.profileForm.get('address').value;
    this.user.city = this.profileForm.get('city').value;
    this.user.postalCode = this.profileForm.get('postalCode').value;
    this.user.country = this.profileForm.get('country').value;
    this.user.aboutUser = this.profileForm.get('aboutUser').value;
    this.user.birthDate = this.profileForm.get('birthDate').value;

    // console.log(this.user);

    this.userService.updateUserProfile(this.user);
  }
}
