import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCentersComponent } from './home-centers.component';

describe('HomeCentersComponent', () => {
  let component: HomeCentersComponent;
  let fixture: ComponentFixture<HomeCentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCentersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
