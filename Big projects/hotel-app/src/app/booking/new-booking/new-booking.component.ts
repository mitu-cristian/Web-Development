import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import { Rooms } from '../rooms.model';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {

  @Output() bookingStart = new EventEmitter<string>();

  rooms: Rooms[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getAvailableRooms().subscribe((rooms) =>
      this.rooms = rooms)
  }

  onStartBooking(form: NgForm) {
    this.bookingStart.emit(form.value.roomName);
  }


}
