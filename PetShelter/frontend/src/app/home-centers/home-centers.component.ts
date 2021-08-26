import { Component, OnInit } from '@angular/core';
import { Center } from './center'
@Component({
  selector: 'app-home-centers',
  templateUrl: './home-centers.component.html',
  styleUrls: ['./home-centers.component.css']
})
export class HomeCentersComponent implements OnInit {
  centers?: Center[];
  constructor() { }

  ngOnInit(): void {
    this.centers = [
      { name: "Wesoła łapa",
        city: "Kraków",
        address: "Kazimierz Wielkiego 10",
        phone: "888 323 123", },
      { name: "Wilczy szaniec",
        city: "Białystok",
        address: "Jana Pawła, 20",
        phone: "674 567 987" },
      { name: "Szara zagroda",
        city: "Warszawa",
        address: "Wiejska 10",
        phone: "543 890 098s" }
    ]
  }

}
