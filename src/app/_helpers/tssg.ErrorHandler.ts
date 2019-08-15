import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class TssgErrorHandler implements ErrorHandler {
    constructor() {
    }
    handleError(error) {
       console.error('tssg.ErrorHandler: ' + error.message || error);
      //  alert('tssg.ErrorHandler: ' + error.message || error);
   }
  }
