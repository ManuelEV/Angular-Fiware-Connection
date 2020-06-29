import { Component, OnInit, OnChanges } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";

import {map} from 'rxjs/operators';

export interface Entity{

  id: String,
  type: String,
  mp10: {
    type: String,
    value: number,
    metadata: any
  },
  mp2_5: {
    type: String,
    value: number,
    metadata: any
  },
  latitud: {
    type: String,
    value: number,
    metadata: any
  },
  longitud: {
    type: String,
    value: number,
    metadata: any
  }

}

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  entities: Entity[] = [
  ];

  selectedValue: String = "Aire";

  idPatterns = [
    'Aire-sensores-centro',
    'Aire-sensores-amanecer',
    'Aire-sensores-el-carmen',
    'Aire-sensores-labranza',
    'Aire-sensores-universidad',
    'Aire-sensores-poniente',
    'Aire-sensores-santa-rosa'
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEntitiesByIdPattern(this.selectedValue);
  }


  getEntities(){

    const orionToken = localStorage.getItem('ORION_TOKEN');

    const httpOptions = {
      headers: new HttpHeaders({
        'fiware-service': 'openiot',
        'fiware-servicepath': '/',
        'X-Auth-Token': orionToken
      })
    };
    

    // Simple GET request with response type <any>   200.13.6.171
    this.http.get<any>('/orion-north/v2/entities?attrs=mp10,mp2_5', httpOptions)
    
    .subscribe(data => {
      console.log(data);
      console.log(data[0].id);
      for (const key in data){
        this.entities.push(data[key]);
      }
    });
  }

  getEntitiesByIdPattern(idPattern: String){
    const orionToken = localStorage.getItem('ORION_TOKEN');

    const httpOptions = {
      headers: new HttpHeaders({
        'fiware-service': 'openiot',
        'fiware-servicepath': '/',
        'X-Auth-Token': orionToken
      })
    };
    

    // Simple GET request with response type <any>   200.13.6.171
    this.http.get<any>('/orion-north/v2/entities?attrs=mp10,mp2_5,latitud,longitud&idPattern='+idPattern, httpOptions)
    
    .subscribe(data => {
      console.log(data);
      this.entities = [];
      for (const key in data){
        this.entities.push(data[key]);
      }
    });
  }
  
}
