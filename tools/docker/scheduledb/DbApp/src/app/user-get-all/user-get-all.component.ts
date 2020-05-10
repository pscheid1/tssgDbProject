import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-get-all',
  templateUrl: './user-get-all.component.html',
  styleUrls: ['./user-get-all.component.css']
})

export class UserGetAllComponent implements OnInit {
  users: User[] = [];
  errorMsg = '';

  constructor(
    private us: UserService
  ) { }

  ngOnInit() {
    this.errorMsg = '';

    this.us.getAll()
      .then(res => {
        this.users = res as User[];
      })
      .catch(err => {
        // this.errorMsg = err.status + ': ' + err.statusText;
        this.errorMsg = err.status + ': ' + JSON.stringify(err.statusText);
        if (this.errorMsg.includes('Unknown')) {
          this.errorMsg += ' - Possible no connection with backend server.';
        }
        this.forceElementView('bottom');
      });

  }

  // scroll browser to element id
  forceElementView(id: string) {
    const element = document.getElementById(id);
    element.scrollIntoView();
  }

  deleteUser(_id) {
    this.errorMsg = '';
    this.us.deleteUser(_id)
      .then(res => {
        this.ngOnInit(); // refresh the page after deletion.
      })
      .catch((err: HttpErrorResponse) => {
        this.errorMsg = err.status + ': ' + err.statusText + ' From ' + err.url;
        if (this.errorMsg.includes('Unknown')) {
          this.errorMsg += ' - Possible no connection with backend server.';
        }

        this.forceElementView('bottom');
      });
  }
}
