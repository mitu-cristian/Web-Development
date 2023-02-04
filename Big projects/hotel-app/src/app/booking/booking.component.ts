import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Reservation } from './reservation.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  roomName: string = "";
  ongoingBooking: boolean = false;

  reservations: Reservation[] = [];

  constructor(private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.bookingService.getReservations().subscribe((reservations) => this.reservations = reservations)

  }

  bookingStartFunction(roomName: string) {
    this.ongoingBooking = true;
    this.roomName = roomName;
  }

  addReservation(reservation: Reservation) {
    this.bookingService.addReservation(reservation).subscribe((reservation) => {
      this.reservations.push(reservation);
    })
  }

  deleteReservation(reservation: Reservation) {
    this.bookingService.deleteReservation(reservation).subscribe(() => {
      this.reservations = this.reservations.filter(t => t.id !== reservation.id);
    })
  }
}
