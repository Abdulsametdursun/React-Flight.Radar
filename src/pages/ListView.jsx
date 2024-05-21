import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const ListView = ({ openModal }) => {
  const state = useSelector((store) => store.flight);
  // The first item of the current page.
  const [itemOffset, setItemOffset] = useState(0);

  // items per page.
  const itemsPerPage = 10;

  // The last item of the current page.
  const endOffset = itemOffset + itemsPerPage;

  // Selected elements in specified range
  const currentItems = state.flights.slice(itemOffset, endOffset);

  // calculate the total number of pages.
  const pageCount = Math.ceil(state.flights.length / itemsPerPage);

  // Each time a new page is selected, it transfers it to state.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % state.flights.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-hover mt-5">
        <thead>
          <tr>
            <th>ID </th>
            <th>Tail Code </th>
            <th>Latitude </th>
            <th>Longitude </th>
            <th>Details </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => openModal(flight.id)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        className="pagination"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="< previous"
      />
    </div>
  );
};

export default ListView;
