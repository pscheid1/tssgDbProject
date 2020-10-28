import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TssgErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        console.error(`tssg.ErrorHandler.handleError: >>>>> Offline Error - ${error.name}: ${error.message} <<<<<`);
      } else {
        // Handle Http Error (error.status === 403, 404...)
        console.error(`tssg.ErrorHandler.handleError: >>>>> Http Error - ${error.name}: ${error.message} <<<<<`);
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      console.error(`tssg.ErrorHandler.handleError: >>>>> Client Error - ${error.name}: ${error.message} <<<<<`);
    }
  }
}
