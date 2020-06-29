import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { latLng, tileLayer, icon, marker, polyline, Map, point } from 'leaflet';

@Component({
  selector: 'app-entities-map',
  templateUrl: './entities-map.component.html',
  styleUrls: ['./entities-map.component.css']
})
export class EntitiesMapComponent implements OnInit, OnChanges {

  map: any;
  markers: any = [];

  @Input('entities') entities: any;

    // Define our base layers so we can reference them multiple times
    streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    
    // Layers control object with our two base layers and the three overlay layers
    layersControl = {
      baseLayers: {
        'Street Maps': this.streetMaps,
        'Wikimedia Maps': this.wMaps
      }
    };
  
  
    // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
    options = {
      layers: [ this.streetMaps],
      zoom: 12,
      center: latLng([ -38.72944724289828, -72.62054446153344 ])
    };

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('CHANGE', changes);
    this.loadMarkers();
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  onClick(event: any){
    //console.log('CLICK EVENT', event);
    console.log(event.latlng);
    //console.log('LOAD MARKERS',this.loadMarkers());
    
  }

  loadMarkers(){
    for(const i in this.markers){
      this.markers[i].removeFrom(this.map);
    }

    this.markers = [];
    
    for(const key in this.entities){
      this.entities[key];
      //console.log(this.entities[key]);
      const m = marker([ this.entities[key].latitud.value,this.entities[key].longitud.value ], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'leaflet/marker-icon.png',
          iconRetinaUrl: 'leaflet/marker-icon-2x.png',
          shadowUrl: 'leaflet/marker-shadow.png'
        })
      }).on('click', () => {
        
      }).bindPopup('<p><b>MP10:</b> ' + this.entities[key].mp10.value + ', <b>MP2.5:</b> ' +  this.entities[key].mp2_5.value + '</p>');;
      this.markers.push(m);
      
      m.addTo(this.map);
    }
  }


}
