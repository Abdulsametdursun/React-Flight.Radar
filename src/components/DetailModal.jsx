import axios from "axios";
import React, { useEffect, useState } from "react";
import { options2 } from "../constant";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setPath } from "../redux/actions/flightActions";

const DetailModal = ({ close, detailId }) => {
  const [d, setDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setDetail(null);

    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        setDetail(res.data);
        dispatch(setPath(res.data.trail));
      })
      .catch((err) => console.log(err));
  }, [detailId]);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={close}>X</span>
        </p>
        {!d ? (
          <Loader />
        ) : (
          <>
            <h2>{d.aircraft.model.text}</h2>
            <h2>{d.aircraft.model.code}</h2>
            <p>
              <span>Registration Code: </span>
              <span>{d.aircraft.registration}</span>
            </p>

            {d.aircraft.images &&
            d.aircraft.images.large &&
            d.aircraft.images.large.length > 0 ? (
              <img src={d.aircraft.images.large[0].src} alt="plane-picture" />
            ) : d.aircraft.images && d.aircraft.images.sideview ? (
              <img
                src="https://www.flightradar24.com/static/images/sideviews/thumbnails/C680.jpg"
                alt="plane-sideview"
              />
            ) : (
              <p>No image available</p>
            )}

            <p>
              <span>Company Name: </span>
              <span>{d.airline ? d.airline.name : "Private Plane"}</span>
            </p>

            <p>
              <span>Departure: </span>
              {d.airport && d.airport.origin ? (
                <a target="_blank" href={d.airport.origin.website}>
                  {d.airport.origin.name}
                </a>
              ) : (
                "No departure information available"
              )}
            </p>

            <p>
              <span>Destination: </span>
              {d.airport && d.airport.destination ? (
                <a target="_blank" href={d.airport.destination.website}>
                  {d.airport.destination.name}
                </a>
              ) : (
                "No destination information available"
              )}
            </p>

            <p className={`status ${d.status ? d.status.icon : "unknown"}`}>
              {d.status ? d.status.text : "Unknown"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailModal;
