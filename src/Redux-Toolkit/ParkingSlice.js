// 'use client';
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userDetail: false,
    userArr: [],
    parkingData: [],
    area: [],
    subArea: [],
    slot: []
}
export const parking = createSlice({
    name: 'Parking',
    initialState,
    reducers: {
        setUserDetail: (state, action) => {
            state.userDetail = action.payload
        },
        setUserArr: (state, action) => {
            state.userArr = action.payload
        },
        setParkingData: (state, action) => {
            state.parkingData = action.payload
        },
        setArea: (state, action) => {
            state.area = action.payload
        },
        setSubArea: (state, action) => {
            state.subArea = action.payload
        },
        setSlot: (state, action) => {
            state.slot = action.payload
        },        
    }
}
)
export const { setUserDetail, setUserArr, setParkingData, setArea, setSubArea, setSlot } = parking.actions
export default parking.reducer;