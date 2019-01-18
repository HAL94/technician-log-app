import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userUpdated = new Subject<User>();
  private user: User;

  constructor() { }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUserUpdate() {
    return this.userUpdated.asObservable();
  }

  updateUser() {
    this.userUpdated.next(this.user);
  }

  nullifyUser() {
    this.user = null;
    this.userUpdated.next(this.user);
  }
}
