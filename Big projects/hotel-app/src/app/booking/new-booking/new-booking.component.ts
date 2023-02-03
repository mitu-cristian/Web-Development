import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent {

  bookingControl = new FormControl('', { validators: [Validators.required] })
  @Output() bookingStart = new EventEmitter<void>();

  onStartBooking() {
    this.bookingStart.emit();
  }


}
