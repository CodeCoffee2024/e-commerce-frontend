import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environmentLocal } from 'src/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage["token"] ? JSON.parse(localStorage["token"])?.access_token : ''}`
  });
  public queryParams = '';
  private params = new HttpParams();
  get publicUrl():string {
    return environmentLocal.publicUrl;
  }
  setAuthentication(token) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  setParameters(parameters = [], setQueryParams = false): ApiService {
      this.queryParams = '';
      this.params = new HttpParams();
      for (const [key, value] of Object.entries(parameters)) {
          this.params.set(key, JSON.stringify(value));
          if (value && setQueryParams) {
              this.queryParams += key+"="+value+"&";
          }
      }
      return this;
  }
  constructor(
    private httpClient: HttpClient, 
    public afAuth: AngularFireAuth
  ) {
  }

  postRequest(endPoint:string, payload: any) {
    return this.httpClient.post(environmentLocal.apiUrl+endPoint,JSON.stringify(payload), {headers: this.headers, params: this.params});
  }

  patchRequest(endPoint:string, payload: any) {
    return this.httpClient.patch(environmentLocal.apiUrl+endPoint,JSON.stringify(payload), {headers: this.headers, params: this.params});
  }

  getRequest(endPoint:string) {
    return this.httpClient.get(environmentLocal.apiUrl+endPoint+(this.queryParams ? '?'+this.queryParams:''), {headers: this.headers, params: this.params});
}
}
