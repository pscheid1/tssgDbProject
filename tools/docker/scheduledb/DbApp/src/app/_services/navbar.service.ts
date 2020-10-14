import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private isLoggedIn = new Subject<boolean>();
  private isRoleAdmin = new Subject<boolean>();

  constructor() {
    this.isLoggedIn.next(false);
    this.isRoleAdmin.next(false);
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }

  getRoleStatus() {
    return this.isRoleAdmin;
  }

  updateRoleStatus(status: boolean) {
    this.isRoleAdmin.next(status);
  }

  updateNavAfterAuth(role: string): void {
    if (role.toLowerCase() === 'admin') {
      this.updateRoleStatus(true);
      this.updateLoginStatus(true);
    } else if (role.toLowerCase() === 'user') {
      this.updateRoleStatus(false);
      this.updateLoginStatus(true);
    }
    else {
      this.updateRoleStatus(false);
      this.updateLoginStatus(false);
    }
  }

}
