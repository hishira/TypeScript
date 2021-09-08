import { Component, OnInit,Input } from '@angular/core';
import {PhotoService} from "../photo.service";
import {Photo} from "../photo";
@Component({
  selector: 'app-pet-photos',
  templateUrl: './pet-photos.component.html',
  styleUrls: ['./pet-photos.component.css']
})
export class PetPhotosComponent implements OnInit {
  @Input() petid?: number;
  photos?: Array<Photo>
  constructor(private photoservice: PhotoService) { }

  ngOnInit(): void {
    if(this.petid)
      this.photoservice
          .getPetPhotos(this.petid)
          .subscribe(photos=>this.photos = photos)
  }

}
