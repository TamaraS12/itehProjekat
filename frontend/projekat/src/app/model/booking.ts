import { Accommodation } from "./accommodation";
import { User } from "./user";

export interface Booking {
    id?: number;
    number_of_persons: number;
    date_from: any;
    date_to: any;
    price: number;

    accommodation_id: number;
    user_id: number;

    accommodation?: Accommodation;
    user?: User;
}