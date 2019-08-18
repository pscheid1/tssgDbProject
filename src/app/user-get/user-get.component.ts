import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})

export class UserGetComponent implements OnInit {
  currentUser: User;
  userFromApi: User;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private us: UserService,
    private as: AuthenticationService
  ) {
    this.currentUser = this.as.currentUserValue;
  }

  ngOnInit() {
    if (this.route.snapshot.data.type === 'authDenied') {
      this.errorMsg = 'User is not authorized for this request.';
    } else {
      this.errorMsg = '';
    }

    this.us.getCurrent().pipe(first()).subscribe(user => {
      // console.log('user-get.component.ngOnInit: ' + JSON.stringify({user}));
      this.userFromApi = user;
    });
  }
}
