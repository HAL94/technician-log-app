import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthentication()
      .subscribe(auth => {
        this.isAuthenticated = auth;
      });
  }

  onLogout() {
    this.authService.logout();
  }

}
