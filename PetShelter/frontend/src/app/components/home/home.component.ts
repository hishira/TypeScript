import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly title: string = 'Pet shelter';
  readonly subtitle: string = 'Adoption is a good choice!';
  readonly imgsrc: string = '/assets/main_pet.jpg';
  constructor() {}

  public goToCats(): void {}
}
