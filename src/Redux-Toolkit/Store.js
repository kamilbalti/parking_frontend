import ParkingReducer from "./ParkingSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: ParkingReducer,
});
