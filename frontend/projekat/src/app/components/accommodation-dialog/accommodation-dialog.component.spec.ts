import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDialogComponent } from './accommodation-dialog.component';

describe('AccommodationDialogComponent', () => {
  let component: AccommodationDialogComponent;
  let fixture: ComponentFixture<AccommodationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDialogComponent]
    });
    fixture = TestBed.createComponent(AccommodationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
