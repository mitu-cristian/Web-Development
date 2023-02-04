export interface Reservation {
    id?: number;
    room: string;
    fullName: string,
    adultsNo: number;
    childNo?: number;
    checkIn: string;
    checkOut: string;
}