import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-entities-map',
  templateUrl: './entities-map.component.html',
  styleUrls: ['./entities-map.component.css']
})
export class EntitiesMapComponent implements OnInit {

  @Input('entities') entities: any;

  constructor() { }

  ngOnInit(): void {

  }

}
