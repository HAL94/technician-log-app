import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  profileImagePath;
  defualtImagePath = './assets/def_user_img.jpg';

  isAuthenticated = false;

  userSubscription: Subscription;
  authSubscription: Subscription;

  constructor(private authService: AuthService, public userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();

    this.authSubscription = this.authService.getAuthenticationObs()
      .subscribe(auth => {
        this.isAuthenticated = auth;
      });

    const user = this.userService.getUser();
    if (user) {
      if (user.profileImage !== null) {
        this.profileImagePath = user.profileImage;
      }
    }

    this.userSubscription = this.userService.getUserUpdate().subscribe(userObs => {
      if (userObs.profileImage) {
        this.profileImagePath = userObs.profileImage;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.profileImagePath = null;
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
