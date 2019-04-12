import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {
  apiurl: any = '/api/';

  constructor(private http: HttpClient) {}

  getAll(): any {
    return this.http.get(this.apiurl + 'data/getMinData');
  }

  getCounts(): any {
    return this.http.get(this.apiurl + 'data/getCounts');
  }

  getLOcations(): any {
    return this.http.get(this.apiurl + 'data/getLocations');
  }

  getDataForLocation(location): any {
    return this.http.get(this.apiurl + 'data/getDataForLocation', {
      params: {
        location: location
      }
    });
  }

  getInfo(time): any {
    return this.http.get(this.apiurl + 'data/getInfo', {
      params: {
        time: time
      }
    });
  }
}
