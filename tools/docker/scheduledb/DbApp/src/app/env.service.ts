import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js.  If there is no env.js file, then
  // these values are used.

  // In the index.html environment, this variable
  // indicates Whether or not env.js is loaded.
  // If false, variables are default values from env.service.ts
  // If true, variables are values from an env.js file.
  public envJsLoaded = false;

  // Whether or not to enable debug mode
  public enableDebug = true;

  // environment variables
  public TSSGAPIURL = 'http://backend.sdb';
  public TSSGAPIPORT = '80';
  public TSSGAPPURL = 'http://frontend.sdb';
  public TSSGAPP_PORT = '80';
  public BACKEND_VERSION = '1.5';
  public FRONTEND_VERSION = '1.5'
  public WEBSITE_URL = 'http://website.sdb';
  public WEBSITE_PORT = '80';

  constructor() {
  }

}
