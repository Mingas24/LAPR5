import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

function CreateVehicleType() {
  const { register, handleSubmit } = useForm();

  const [energySource, setSelectedEnergySource] = useState(Number);

  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    fetch( Links.MDR_URL()+"/api/vehicleType", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new VehicleType!");
          return error.toString();
        }
        setResult("VehicleType created with success!");
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

  return (
    <div>
      <h1>Create New VehicleType</h1>
      <div className="divCreate" data-testid="createTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name: </label>
          <input
            data-testid="nameTest"
            type="textInput"
            name="name"
            ref={register}
            placeholder="Name of the new VehicleType"
          />
          <br />
          <label>Autonomy: </label>
          <input
            data-testid="autonomyTest"
            type="number"
            name="autonomy"
            ref={register}
            placeholder="Autonomy of the new VehicleType"
          />
          <br />
          <label>Cost: </label>
          <input
            data-testid="costTest"
            type="number"
            name="cost"
            ref={register}
            placeholder="Cost of the new VehicleType"
          />
          <br />
          <label>Average Speed: </label>
          <input
            data-testid="averageSpeedTest"
            type="number"
            name="averageSpeed"
            ref={register}
            placeholder="Average Speed of the new VehicleType"
          />
          <br />
          <label>Energy Source: </label>
          <select onChange={e => setSelectedEnergySource(e.target.value)}>
            <option
              value={23}>
              Gasoleo
              </option>
            <option
              value={20}>
              GPL
              </option>
            <option
              value={50}>
              Hidrogenio
              </option>
            <option
              value={75}>
              Eletrico
              </option>
            <option
              value={1}>
              Gasolina
              </option>
            <option selected disabled hidden>EnergySource</option>
          </select>
          <input type="hidden"
            data-testid="energySourceTest"
            name="energySource"
            value={energySource}
            ref={register} />
          <br />
          <label>Consumption: </label>
          <input
            data-testid="consumptionTest"
            type="number"
            name="consumption"
            ref={register}
            placeholder="Consumption of the new VehicleType"
          />
          <br />
          <label>Emissions: </label>
          <input
            data-testid="emissionsTest"
            type="number"
            name="emissions"
            ref={register}
            placeholder="Emissions of the new VehicleType"
          />
          <input type="submit" value="Submit" data-testid="submitTest" onClick={openModal} />
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

export default CreateVehicleType;
