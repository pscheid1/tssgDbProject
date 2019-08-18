import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  currentUser: User;
  user: User = {
    _id: null,
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    role: null,
    email: null,
    mobile: null,
    inActive: false,
    createdDate: new Date()
  };

  // for input fields there is no 'enabled' attribute, only
  // disabled.  status is used to trigger the 'disabled' attribute,
  // therefore to enable the field we need to set status to false and
  // to disable the field we need to set status to true;
  state: boolean;
  enabled = false;
  disabled = true;
  errorMsg = '';
  dspCreatedDate = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private as: AuthenticationService,
    private us: UserService
  ) {
    this.currentUser = this.as.currentUserValue;
    }

  ngOnInit() {
    if (this.route.snapshot.data.type === 'authDenied') {
      this.errorMsg = 'User is not authorized for this request.';
    } else {
      this.errorMsg = '';
    }

    // user-edit.component is called by both user-get.component and user-get-all.component
    // user-get-all.component has role admin and can change the role of any account
    // user-edit.component has role user and can not change the role of any account, even it's own
    // based on the current user role we enable/disable the role input fields
    // get the role of the current user
    this.state = (this.currentUser.role === 'Admin') ? this.enabled : this.disabled;
    // get the getElementById of each role input field and enable/disable the input fields
    let roleInput: any = document.getElementById('r1');
    roleInput.disabled = this.state;
    roleInput = document.getElementById('r2');
    roleInput.disabled = this.state;
    roleInput = document.getElementById('r3');
    roleInput.disabled = this.state;

    // this.route.params.forEach(function (item) { });
    this.route.params.subscribe(params => {
      this.us.getById(`${params._id}`).pipe(first()).subscribe(user => {
        const usr = user as User;
        if (usr.createdDate) {
          this.dspCreatedDate = usr.createdDate.toString().substring(0, 10);
        }
        this.user = user as User;
      });
    });
  }

  cancel() {
    if (this.route.snapshot.data.type === 'get-all') {
      this.router.navigate(['user/get-all']);
    } else {
      this.router.navigate(['user/get']);
    }
  }

  updateUser(userForm: any) {
    this.us.updateUser(this.user)
      .then(res => {
        if (this.route.snapshot.data.type === 'get-all') {
          this.router.navigate(['user/get-all']);
        } else {
          this.router.navigate(['user/get']);
        }
      })
      .catch(err => {
        this.errorMsg = err;
        // ensure href does not already contain '#bottom'
        // if not, add '#bottom' to scroll page to bottom to
        // insure error message is visable
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      });
  }
}


