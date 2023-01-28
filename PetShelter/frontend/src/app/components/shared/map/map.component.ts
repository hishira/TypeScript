import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html',
})
export class MapComponent implements AfterViewInit {
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  
  public get latlng(): [number, number] {
    return [this.lat,this.lng];
  }
  private map?: L.Map;

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.latlng,
      zoom: 3,
    });
    const tiles: L.TileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        minZoom: 3,
      }
    );
    tiles.addTo(this.map);
    L.marker(this.latlng).addTo(this.map)
  }
}
