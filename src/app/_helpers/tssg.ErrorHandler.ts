import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TssgErrorHandler implements ErrorHandler {
  constructor() {
  }
  //   handleError(error) {
  //      console.error('tssg.ErrorHandler: ' + error.message || error);
  //      alert('tssg.ErrorHandler: ' + error.message || error);
  //  }

  handleError(error: Error | HttpErrorResponse) {
    console.log(error);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.log('It happens: offline Error');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        // alert('Http Error');
        console.log('It happens: Http Error');
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      // alert('Client Error');
      console.log('It happens: Client Error');
    }
    // Log the error anyway
    console.log('It happens: ');
  }
}
