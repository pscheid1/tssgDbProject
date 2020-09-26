import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Venue } from 'src/app/_models/venue';
// import { environment } from 'src/environments/environment';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})

export class VenueService {
  private uri: string;
  constructor(private http: HttpClient, private env: EnvService) {
    // this.uri = environment.TSSGAPIURL + ':' + environment.TSSGAPIPORT + '/venues';
    this.uri = `${env.TSSGAPIURL}:${env.TSSGAPIPORT}/venues`;
  }


  private extractData(res: HttpResponse<Venue>) {
    const body = res;
    // console.log(res);
    return body || {};
  }

  // private handleErrorPromise(error: Error | HttpErrorResponse) {
  //   if (error instanceof HttpErrorResponse) {
  //     // Server or connection error happened
  //     if (!navigator.onLine) {
  //       // Handle offline error
  //       console.error('venue.service.handleErrorPromise offline error: ' + error);
  //     } else {
  //       // Handle Http Error (error.status === 403, 404...)
  //       HttpErrorResponse.toString();
  //       console.error('venue.service.handleErrorPromise HttpErrorResponse: ' + HttpErrorResponse.toString());
  //     }
  //   }

  //   return Promise.reject(error || error.message);
  // }

  // sinple unit test routine
  getTest(value: string) {
    return value;
  }

  async addVenue(obj: Venue) {
    return await this.http.post(`${this.uri}/add`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 409, statusText: err, url: `${this.uri}/add` });
      });
  }

  // request all venues from the node server
  getVenues() {
    // return this.http.get(`${this.uri}`);
    return this.http.get(`${this.uri}`)
    .toPromise()
    .then(this.extractData)
    .catch(err => {
      console.log(`venue.service.getVenues: ${err}`);
      throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}` });
    });

  }

  // request a list of current venue id's
  listVenues() {
    return this.http.get(`${this.uri}/venues`);
  }

  // send edit request to the node server. called from venue-get.component.html
  // via app-routing.module.ts path match for 'venue/edit/:_id'
  editVenue(_id) {
    return this.http.get(`${this.uri}/edit/` + _id)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/edit` });
      });
  }

  async deleteVenue(_id) {
    if (confirm('M004\nSelect OK to delete, or Cancel to return.')) {
      return await this.http.get(`${this.uri}/delete/${_id}`)
        .toPromise()
        .then(this.extractData)
        .catch(err => {
          throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/delete` });
        });
    }
    return;
  }

  async updateVenue(obj: Venue) {
    return await this.http.post(`${this.uri}/update/`, obj)
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        throw new HttpErrorResponse({ status: 404, statusText: err, url: `${this.uri}/update` });
      });
  }
}
