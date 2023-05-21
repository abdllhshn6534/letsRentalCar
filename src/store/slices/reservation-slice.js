import { createSlice } from "@reduxjs/toolkit";


export const reservationSlice = createSlice({
    name:"reservation",
    initialState:{
        vehicle: null,
        reservation: null
    },
    reducers:{
        setVehicle: (state, action) => {
            state.vehicle = action.payload;
        },
        setReservation: (state, action) => {
            state.reservation = action.payload
        }
    }
});

export const {setVehicle, setReservation } = reservationSlice.actions;
export default reservationSlice.reducer;