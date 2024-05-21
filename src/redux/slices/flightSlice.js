import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";

const initialState = {
  flights: [],
  isLoading: false,
  isError: false,
  path: [],
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    // Set the path of the flight
    setPath: (state, action) => {
      state.path = action.payload.map((i) => [i.lat, i.lng]);
    },
    clearPath: (state) => {
      state.path = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getFlights.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFlights.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.flights = action.payload;
    });
    builder.addCase(getFlights.rejected, (state, action) => {
      console.log("Request Not Successful", action.error);
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(setPath, (state, action) => {
      state.path = action.payload;
    });
  },
});

export default flightSlice.reducer;
export const { setPath } = flightSlice.actions;
