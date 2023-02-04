import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent {

  textButton: string = "Delete";
  colorButton: string = "red";

  @Input() reservation: Reservation = {
    room: "",
    fullName: "",
    adultsNo: 0,
    childNo: 0,
    checkIn: "",
    checkOut: ""
  }
  @Output() onDeleteReservation: EventEmitter<Reservation> = new EventEmitter;

  deleteReservation(reservation: Reservation) {
    this.onDeleteReservation.emit();
  }
}
