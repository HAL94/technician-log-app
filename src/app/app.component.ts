import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'technician-log-app';

  constructor(private authService: AuthService, public userService: UserService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    if (this.authService.getUserId()) {
      this.userService.setUser(this.authService.getUserId());
    }
  }

}
