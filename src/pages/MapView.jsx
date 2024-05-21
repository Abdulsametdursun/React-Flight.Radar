import { useSelector } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const MapView = ({ openModal }) => {
  const state = useSelector((store) => store.flight);

  const planeIcon = icon({
    iconUrl: "/plane-ii.png",
    iconSize: [25, 25],
  });

  return (
    <MapContainer
      center={[38.892121, -99.336344]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {state.flights.map((flight) => (
        <Marker
          icon={planeIcon}
          key={flight.id}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="popup">
              <span>Code:{flight.code}</span>
              <button onClick={() => openModal(flight.id)}>Detail</button>
            </div>
          </Popup>
        </Marker>
      ))}
      {state.path.length > 0 && <Polyline positions={state.path} />}
    </MapContainer>
  );
};

export default MapView;
