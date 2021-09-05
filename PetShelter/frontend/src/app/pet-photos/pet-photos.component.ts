import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pet-photos',
  templateUrl: './pet-photos.component.html',
  styleUrls: ['./pet-photos.component.css']
})
export class PetPhotosComponent implements OnInit {
  @Input() petid?: number;
  constructor() { }

  ngOnInit(): void {
  }

}
