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
  @Input() more?: boolean;
  @ViewChild('imgelement', { static: false }) imageelement?: ElementRef;

  photos?: Array<Photo>;
  photoindex: number = 0;
  private timeout: NodeJS.Timer | null = null;
  private timer: NodeJS.Timer | null = null;
  constructor(private photoservice: PhotoService) {}

  ngOnInit(): void {
    if (this.petid) {
      this.photoservice
        .getPetPhotos(this.petid)
        .subscribe((photos) => (this.photos = photos));
      this.selectPhoto();
    }
  }
  ngOnDestroy() {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }
  private intervalClear(): void {
    if (this.timeout) {
      clearInterval(this.timeout);
      if(this.timer)
        clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.selectPhoto();
      }, 2000);
    }
  }
  circleClick(index: number): void {
    this.photoindex = index;
    this.intervalClear();
  }

  private classToggle(...classes: string[]): void {
    for (let i of classes) {
      this.imageelement?.nativeElement.classList.toggle(i);
    }
  }
  leftImage(): void {
    if (this.photos) {
      this.photoindex =
        this.photoindex - 1 < 0 ? this.photos?.length - 1 : this.photoindex - 1;
      this.intervalClear();
    }
  }
  rightImage(): void {
    if (this.photos) {
      this.photoindex =
        this.photoindex + 1 >= this.photos.length ? 0 : this.photoindex + 1;
      this.intervalClear();
    }
  }
  selectPhoto(): void {
    if (this.more) {
      this.timeout = setInterval(() => {
        if (this.imageelement && this.photos) {
          this.classToggle('imgappear', 'animationnone', 'animationnone');
          setTimeout(() => {
            if (this.imageelement && this.photos) {
              this.classToggle('imgappear');
              this.photoindex =
                this.photoindex + 1 >= this.photos.length
                  ? 0
                  : this.photoindex + 1;
            }
          }, 100);
        }
      }, 2000);
    }
  }
}
