import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/_services/authentication.service';

// following code added to get updated (non cached) version of currentUser
// import { JwtHelperService } from '@auth0/angular-jwt';          not using this
import { User } from 'src/app/_models/user';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // replace following line which gets stale version of currentUser
        // const currentUser = this.authenticationService.currentUserValue;
        const user: User = JSON.parse(localStorage.getItem('currentUser'));
        // const jwtService = new JwtHelperService();          not using this
        // if (currentUser && currentUser.token) {  replaced as described above
          if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${currentUser.token}`
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}
