import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { PhotoSchema, PhotosGQL } from 'src/app/types/types';
@Component({
  selector: 'app-pet-photos',
  styleUrls: ['./pet-photos.component.scss'],
  templateUrl: './pet-photos.component.html',
})
export class PetPhotosComponent implements OnInit, OnDestroy {
  @ViewChild('imgelement', { static: false }) imageelement?: ElementRef;

  @Input() more?: boolean;
  @Input() petid?: number | undefined;

  photoindex: number = 0;
  photos: Partial<PhotoSchema>[] = [];
  private timeout: NodeJS.Timer | null = null;
  private timer: NodeJS.Timer | null = null;

  constructor(
    private photosGQL: PhotosGQL
  ) {}

  circleClick(index: number): void {
    this.photoindex = index;
    this.intervalClear();
  }

  leftImage(): void {
    if (this.photos) {
      this.photoindex =
        this.photoindex - 1 < 0 ? this.photos?.length - 1 : this.photoindex - 1;
      this.intervalClear();
    }
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    document.removeEventListener(
      'keydown',
      (ev: KeyboardEvent) => this.keyDownHandle(ev),
      true
    );
  }

  ngOnInit(): void {
    if (this.petid) {
      this.photosGQL
        .watch({
          petId: this.petid,
        })
        .valueChanges.subscribe((photos) => (this.photos = photos.data.photos));

      this.selectPhoto();
    }
    if (this.more) {
      document.addEventListener(
        'keydown',
        (ev: KeyboardEvent) => this.keyDownHandle(ev),
        true
      );
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

  private classToggle(...classes: string[]): void {
    for (let i of classes) {
      this.imageelement?.nativeElement.classList.toggle(i);
    }
  }

  private intervalClear(): void {
    if (this.timeout) {
      clearInterval(this.timeout);
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.selectPhoto();
      }, 2000);
    }
  }

  private keyDownHandle(ev: KeyboardEvent): void {
    if (ev.code === 'ArrowRight') {
      this.rightImage();
    } else if (ev.code === 'ArrowLeft') {
      this.leftImage();
    }
  }
}
