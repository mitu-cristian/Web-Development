import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StopBookingComponent } from './stop-booking.component';

@Component({
  selector: 'app-current-booking',
  templateUrl: './current-booking.component.html',
  styleUrls: ['./current-booking.component.css']
})
export class CurrentBookingComponent implements OnInit {
  minDate: Date = new Date();
  @Output() bookingExit = new EventEmitter();

  ngOnInit() {

  }

  constructor(private dialog: MatDialog) { }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onSubmit(form: NgForm) {
    console.log(this.range.value.start);
  }

  onStop() {
    const DialogRef = this.dialog.open(StopBookingComponent);

    DialogRef.afterClosed().subscribe(result => {
      if (result)
        this.bookingExit.emit();


    })
  }


}
