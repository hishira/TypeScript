import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly title: string = 'Pet shelter';
  readonly subtitle: string = 'Adoption is a good choice!';
  constructor() { }

  ngOnInit(): void {
  }

  public goToCats():void{
    
  }

}
