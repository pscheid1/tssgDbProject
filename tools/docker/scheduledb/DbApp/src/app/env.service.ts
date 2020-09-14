import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // Whether or not to enable debug mode
  public enableDebug = true;

  // environment variables
  public TSSGAPIURL = 'http://backend.sdb';
  public TSSGAPIPORT = '80';

  constructor() {
  }

}
