import {create} from "zustand";

type BookingState = {
    step: number;
    guests: number | null;
    date: string | null;
    calendarDate: string | null;
    time: string | null;

    firstName: string;
    lastName: string;
    email: string | null;
    bookingId: string | null;

    setStep: (step: number) => void;
    setGuests: (g: number) => void;
    setDate: (d: string) => void;
    setCalendarDate: (d: string) => void;
    setTime: (t: string) => void;

    setFirstName: (v: string) => void;
    setLastName: (v: string) => void;
    setEmail: (e: string) => void;
    setBookingId: (b: string) => void;
    reset: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
    step: 1,
    guests: null,
    date: null,
    calendarDate: null,
    time: null,

    firstName: "",
    lastName: "",
    email: "",
    bookingId: "",

    setStep: (step) => set({step}),
    setGuests: (guests) => set({guests}),
    setDate: (date) => set({date}),
    setCalendarDate: (calendarDate) => set({calendarDate}),
    setTime: (time) => set({time}),
    setFirstName: (firstName) => set({firstName}),
    setLastName: (lastName) => set({lastName}),
    setEmail: (email) => set({email}),
    setBookingId: (bookingId) => set({bookingId}),
    reset: () =>
        set({
            step: 1,
            guests: null,
            date: null,
            time: null,
            firstName: "",
            lastName: "",
            email: null,
            bookingId: null,
            calendarDate: null,
        }),
}));
