import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
@Component({
  selector: 'app-pet-photos',
  templateUrl: './pet-photos.component.html',
  styleUrls: ['./pet-photos.component.css'],
})
export class PetPhotosComponent implements OnInit {
  @Input() petid?: number;
  @ViewChild('imgelement', { static: false }) imageelement?: ElementRef;

  photos?: Array<Photo>;
  photoindex: number = 0;
  private timeout: NodeJS.Timer | null = null;
  constructor(private photoservice: PhotoService) {}

  ngOnInit(): void {
    if (this.petid) {
      this.photoservice
        .getPetPhotos(this.petid)
        .subscribe((photos) => (this.photos = photos));
      this.selectPhoto();
    }
  }

  circleClick(index: number): void {
    this.photoindex = index;
    if(this.timeout){
      clearInterval(this.timeout);
      setTimeout(() => {
          this.selectPhoto()
      }, 2000);
    }
  }

  selectPhoto(): void {
    this.timeout = setInterval(() => {
      if (this.imageelement && this.photos) {
        this.photoindex =
          this.photoindex + 1 >= this.photos.length ? 0 : this.photoindex + 1;
      }
    }, 2000);
  }
}
