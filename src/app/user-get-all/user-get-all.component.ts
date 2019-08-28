import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-get-all',
  templateUrl: './user-get-all.component.html',
  styleUrls: ['./user-get-all.component.css']
})

export class UserGetAllComponent implements OnInit {
    users: User[] = [];
    errorMsg = '';

    constructor(
      private userService: UserService,
      private us: UserService
      ) { }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    deleteUser(_id) {
      this.us.deleteUser(_id)
      .then(res => {
        this.ngOnInit(); // refresh the page after deletion.
      })
      .catch(err => {
        // err is an instance of TypeError.  I have not found any way to
        // get meaningful information back.  I'm forcing the 'Not Found' below
        // because what is returned is dog shit.
        this.errorMsg = 'Not Found: ' + err.message;
        // ensure href does not already contain '#bottom'
        // if not, add '#bottom' to scroll page to bottom to
        // insure error message is visable
        if ((window.location.href).indexOf('#bottom') < 0) {
          window.location.href = window.location.href + '#bottom';
        }
      })
    }

}
