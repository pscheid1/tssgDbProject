import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
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
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private us: UserService
  ) {

  }

  ngOnInit() { }

  cancel() {
    this.router.navigate(['/']);
  }

  createUser(usrForm: NgForm) {
    this.us.registerUser(this.user)
      .then(res => {
        this.router.navigate(['user/get-all']);
      })
      .catch(err => {
        this.error = err;
      });
  }
}


