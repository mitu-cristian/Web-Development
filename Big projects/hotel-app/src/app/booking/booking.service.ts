import { Rooms } from "./rooms.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "./reservation.model";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private apiUrlAvailableRooms = 'http://localhost:5000/availableRooms';
    private apiUrlReservations = 'http://localhost:5000/reservations';

    constructor(private http: HttpClient) { }

    getAvailableRooms(): Observable<Rooms[]> {
        return this.http.get<Rooms[]>(this.apiUrlAvailableRooms);
    }

    getReservations(): Observable<Reservation[]> {
        return this.http.get<(Reservation[])>(this.apiUrlReservations);
    }

    addReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiUrlReservations, reservation, httpOptions);
    }

    deleteReservation(reservation: Reservation): Observable<Reservation> {
        const url = `${this.apiUrlReservations}/${reservation.id}`;
        return this.http.delete<Reservation>(url);
    }

}