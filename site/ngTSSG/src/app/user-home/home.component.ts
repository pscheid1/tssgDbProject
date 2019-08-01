import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  currentUser: User;
  userFromApi: User;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    if (this.route.snapshot.data.type === 'authDenied') {
      this.error = 'User is not authorized for this request.';
    } else {
      this.error = '';
    }
    this.userService.getById(this.currentUser._id).pipe(first()).subscribe(user => {
      this.userFromApi = user as User;
    });
  }
}
