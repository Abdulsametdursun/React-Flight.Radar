import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

export const getFlights = createAsyncThunk("flight/getFlights", async () => {
  // Send API request
  const res = await axios.request(options);

  // Format data coming from API
  const refined = res.data.aircraft.map((i) => ({
    id: i[0],
    code: i[1],
    lat: i[2],
    lng: i[3],
  }));

  // Return formatted data
  return refined;
});

// Define and export the setPath action
export const setPath = createAction("flight/setPath");
