import { DialogRef, throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StopBookingComponent } from './stop-booking.component';
import { DatePipe } from '@angular/common';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-current-booking',
  templateUrl: './current-booking.component.html',
  styleUrls: ['./current-booking.component.css']
})
export class CurrentBookingComponent implements OnInit {
  minDate: Date = new Date();
  @Input() roomName: string = "";
  @Output() bookingExit = new EventEmitter();
  @Output() onAddReservation = new EventEmitter<Reservation>();

  fullName: string = "";
  adultsNo: number = 0;
  childNo: number = 0;
  checkIn: string = "";
  checkOut: string = "";

  datepipe: DatePipe = new DatePipe('en-US');

  ngOnInit() {

  }

  constructor(private dialog: MatDialog) { }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onSubmit(form: NgForm) {

    this.checkIn = this.datepipe.transform(this.range.value.start, 'MM-dd-YYYY')!;
    this.checkOut = this.datepipe.transform(this.range.value.end, 'MM-dd-YYYY')!;

    const reservation: Reservation = {
      room: this.roomName,
      fullName: form.value.name,
      adultsNo: form.value.adults,
      childNo: form.value.children,
      checkIn: this.checkIn,
      checkOut: this.checkOut

    }

    this.onAddReservation.emit(reservation);

    this.fullName = "";
    this.adultsNo = 0;
    this.childNo = 0;
    this.checkIn = "";
    this.checkOut = "";
  }

  onStop() {
    const DialogRef = this.dialog.open(StopBookingComponent);

    DialogRef.afterClosed().subscribe(result => {
      if (result)
        this.bookingExit.emit();
    })
  }


}
