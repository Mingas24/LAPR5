import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

function CreateVehicle() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const [vehicleTypes, setVehicleType] = useState([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState("");
  const [linePaths, setLinePaths] = useState([]);
  const fetchVehicleTypes = async () => {
    const data = await fetch(
      Links.MDR_URL()+"/api/vehicleType/listVehicleTypes"
    );
    const vehicleTypes = await data.json();
    console.log(vehicleTypes);
    setVehicleType(
      vehicleTypes.map((vehicleType) => ({
        label: vehicleType.name,
        value: vehicleType.name,
      }))
    );
  };

  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    fetch(Links.MDV_URL()+"/api/Vehicle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new vehicle!");
          return error.toString();
        }
        setResult("Vehicle created with success!");
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
  function addLinePath() {
    var vehicleTypeArray = {
      vehicleType: selectedVehicleTypes,
    };
    setLinePaths(linePaths.concat(vehicleTypeArray));
  }

  return (
    <div>
      <h1>Create New Vehicle</h1>
      <div className="CreateVehicle" data-testid="createVehicleTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label>
              <p>License Plate</p>
              <input
                data-testid="licensePlateTest"
                type="textInput"
                name="licensePlate"
                ref={register}
                placeholder="License Plate"
              />
              <br/>
              <p>VIN</p>
              <input
                data-testid="vinTest"
                type="textInput"
                name="vehicleVIN"
                ref={register}
                placeholder="VIN (Vehicle Identification Number)"
              />
              <br/>
              <label data-testid="vehicleTypeTextTest">Vehicle Type: </label>
              <select
                data-testid="vehicleTypeSelectTest"
                onChange={(e) => setSelectedVehicleTypes(e.target.value)}
              >
                {vehicleTypes.map((vehicleType) => (
                  <option key={vehicleType.value} value={vehicleType.value}>
                    {vehicleType.label}
                  </option>
                ))}
                <option selected disabled hidden>
                  {" "}
                  Vehicle Type
                </option>
              </select>
              <button
                data-testid="vehicleAddVehicleTypeTest"
                type="button"
                className="buttonCreate"
                onClick={addLinePath}
              >
                Add Vehicle Type
              </button>
              <br/>
              <input
                data-testid="vehicleTypeTest"
                type="hidden"
                name="vehicleTypeID"
                value={JSON.stringify(selectedVehicleTypes)}
                ref={register}
              />
              
              {/* ########################################################### */}
              <p>StartingDate</p>
              <input
                data-testid="vehicleEntranceDateTest"
                type="textInput"
                name="vehicleEntranceDate"
                ref={register}
                placeholder="Service starting date"
              />
              <br />
              <br />
              <input
                type="submit"
                value="Submit"
                data-testid="submitTest"
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
            </label>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default CreateVehicle;
