import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListView from "./pages/ListView";
import MapView from "./pages/MapView";
import DetailModal from "./components/DetailModal";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightActions";

const App = () => {
  const [isMapView, setIsMapView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => dispatch(getFlights()), 5000);
  }, [dispatch]);

  // open modal
  const openModal = (id) => {
    setDetailId(id);
    setIsModalOpen(true);
  };

  // close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setDetailId(null);
  };

  return (
    <>
      <Header />
      <div className="view-buttons">
        <button
          className={isMapView ? "active" : ""}
          onClick={() => setIsMapView(true)}
        >
          Map View
        </button>
        <button
          className={isMapView ? "" : "active"}
          onClick={() => setIsMapView(false)}
        >
          List View
        </button>
      </div>

      {isMapView ? (
        <MapView openModal={openModal} />
      ) : (
        <ListView openModal={openModal} />
      )}
      {/* Save the modal in app js for both pages */}
      {isModalOpen && <DetailModal close={closeModal} detailId={detailId} />}
    </>
  );
};

export default App;
