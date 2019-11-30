import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TssgErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error: Error | HttpErrorResponse) {
    console.log('tssg.ErrorHandler.handleError: ' + error);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.log('tssg.ErrorHandler.handleError: offline Error');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        console.log('tssg.ErrorHandler.handleError: Http Error');
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      console.log('tssg.ErrorHandler.handleError: Client Error: ' + error.name + ': ' + error.message);
    }
  }
}
