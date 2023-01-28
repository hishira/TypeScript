import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterpetsComponent } from './shelterpets.component';

describe('ShelterpetsComponent', () => {
  let component: ShelterpetsComponent;
  let fixture: ComponentFixture<ShelterpetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelterpetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterpetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
