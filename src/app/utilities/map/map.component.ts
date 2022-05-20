import { Component, OnInit } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer, icon } from 'leaflet';

let layers = marker([ 46.879966, -121.726909 ], {
  icon: icon({
     iconSize: [ 25, 41 ],
     iconAnchor: [ 13, 41 ],
     iconUrl: 'assets/marker-icon.png',
     shadowUrl: 'assets/marker-shadow.png'
  })
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 18, 
      attribution: 'Angular Movies' })
    ],
    zoom: 16,
    center: latLng(10.844118712336197, 106.66256904602052)
  };

  layers: Marker<any>[] = []
  handleMapClick(event: LeafletMouseEvent){
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log({latitude, longitude});
    this.layers = [];
    this.layers.push(marker([latitude, longitude]));
  }
}
