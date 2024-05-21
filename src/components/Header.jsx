import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const state = useSelector((store) => store.flight);
  const flightsCount = state.flights ? state.flights.length : 0;

  return (
    <header>
      <div>
        <img src="/plane-i.png" alt="Plane" />
        <h3>Flight Radar</h3>
      </div>
      <p>
        {state.isLoading
          ? "Flights are Calculating"
          : state.isError
          ? "There is an Error!!!"
          : flightsCount + " Flights Found"}
      </p>
    </header>
  );
};

export default Header;
