import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly imgsrc: string = '/assets/main_pet.jpg';
  readonly subtitle: string = 'Adoption is a good choice!';
  readonly title: string = 'Pet shelter';
  constructor() {}

  public goToCats(): void {}
}
