import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

//https://demo.mobiscroll.com/react/datetime
//http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm
function CreateWorkblock() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchTrips();
  }, []);

  const [selectedTrips, setselectedTrips] = useState("");
  const [trips, setTrips] = useState([]);
  const [tripsFinal, setTripsFinal] = useState([]);

  const fetchTrips = async () => {
    const data = await fetch(
      Links.MDV_URL()+"/api/Trip"
      //"https://lapr5-mdv-001.azurewebsites.net/api/Trip"
    );
    const trips = await data.json();
    setTrips(
      trips.map((trip) => ({ label: trip.tripCode, value: trip.tripCode }))
    );
  };
  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    data.trips = JSON.parse(data.trips);
    fetch(Links.MDV_URL()+"/api/Workblock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Workblock!");
          return error.toString();
        }
        setResult("Workblock created with success!");
        window.location.reload();
        return response.json();
      })
      .then((data) => console.log(data));
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setResult("");
  }

  function addTrips() {
    setTripsFinal(tripsFinal.concat(selectedTrips));
    console.log(tripsFinal);
  }

  return (
    <div className="divCreateWorkblockUI" data-testid="WorkblockTest">
      <h1>Create New Workblock</h1>
      <div className="divCreate" data-testid="createWorkblockTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="workblockCodeTextTest">
            Workblock Code (WBXXXX):{" "}
          </label>
          <input
            data-testid="workblockCodeTest"
            type="textInput"
            name="Code"
            ref={register}
            placeholder="Workblock Code"
          />
          <br />
          <label data-testid="startTimeTextTest">
            Start Time(DD-MM-YYYY HH:MM):
          </label>
          <br />
          <input
            data-testid="startTimeTest"
            type="string"
            name="startTime"
            ref={register}
            placeholder="Start Time of the new Workblock"
          />
          <br />
          <label data-testid="endTimeTextTest">
            End Time(DD-MM-YYYY HH:MM):
          </label>
          <br />
          <input
            data-testid="endTimeTest"
            type="string"
            name="endTime"
            ref={register}
            placeholder="End Time of the new Workblock"
          />
          <br />
          <label data-testid="tripsTextTest">Trips: </label>
          <select
            data-testid="tripsSelectTest"
            onChange={(e) => setselectedTrips(e.target.value)}
          >
            {trips.map((trip) => (
              <option value={trip.value}>{trip.label}</option>
            ))}
            <option selected disabled hidden>
              {" "}
              Trip Code
            </option>
          </select>
          <button
            data-testid="tripButtonTest"
            type="button"
            className="buttonCreate"
            onClick={addTrips}
          >
            Add New Trip
          </button>
          <input
            data-testid="tripTest"
            type="hidden"
            name="trips"
            value={JSON.stringify(tripsFinal)}
            ref={register}
          />
          <select name="addedTrips" size="5">
            {tripsFinal.map((trip) => (
              <option>Trip Code:{trip}</option>
            ))}
          </select>
          <input
            data-testid="submitTest"
            type="submit"
            value="Submit"
            onClick={openModal}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
          >
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="popup">{result}</div>
          </Modal>
        </form>
      </div>
    </div>
  );
}
export default CreateWorkblock;
