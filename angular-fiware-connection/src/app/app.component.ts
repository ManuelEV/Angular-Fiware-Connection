import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { environment } from '../environments/environment';

//import {map} from 'rxjs/operators';

//ng serve --proxy-conf proxy.conf.json

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-fiware-connection';

  token: any = null;


  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.getOrionToken();

  }

  getOrionToken(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(environment.orionAuthApp)
      })
    };
    const payload = new HttpParams()
      .set('username', environment.orionUser)
      .set('password', environment.orionUserPassword)
      .set('grant_type', 'password');

    // Simple GET request with response type <any>   200.13.6.171
    this.http.post<any>('/oauth2/token', payload, httpOptions)
    .subscribe(data => {
      console.log(data);
      this.token = data.access_token;
      localStorage.setItem('ORION_TOKEN', data.access_token);
    });
  }

}
