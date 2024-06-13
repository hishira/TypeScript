import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenubarComponent } from './admin-menubar.component';

describe('AdminMenubarComponent', () => {
  let component: AdminMenubarComponent;
  let fixture: ComponentFixture<AdminMenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenubarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
