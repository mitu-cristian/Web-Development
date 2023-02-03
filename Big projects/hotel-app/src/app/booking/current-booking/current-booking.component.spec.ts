import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBookingComponent } from './current-booking.component';

describe('CurrentBookingComponent', () => {
  let component: CurrentBookingComponent;
  let fixture: ComponentFixture<CurrentBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
