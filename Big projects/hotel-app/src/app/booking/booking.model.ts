export interface Booking {
    room: string;
    fullname: string;
    adults: number;
    children?: number;
    checkin: Date;
    checkout: Date;
    state: 'Completed' | 'Cancelled' | null;
}