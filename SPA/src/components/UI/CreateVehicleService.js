import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

function CreateDriver() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchWorkblocks();
  }, []);

  const [workblocks, setWorkblocks] = useState([]);
  const [selectedWorkblocks, setSelectedWorkblocks] = useState("");
  const [workblocksFinal, setWorkblocksFinal] = useState([]);

  const fetchWorkblocks = async () => {
    const data = await fetch(
      Links.MDV_URL()+"/api/Workblock"
      //"https://lapr5-mdv-001.azurewebsites.net/api/Workblock"
    );
    const wbInfo = await data.json();
    setWorkblocks(wbInfo.map((wb) => (
      { label: wb.workblockCode, value: wb.workblockCode })));
  };
  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    data.workblockList = JSON.parse(data.workblockList);
    fetch(Links.MDV_URL()+"/api/VehicleService", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Vehicle Service!");
          return error.toString();
        }
        setResult("Vehicle Service created with success!");
        //window.location.reload();
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
  function addWorkBlock() {
    // var driverTypeArray = {
    //   selectedDriverTypes
    // };
    setWorkblocksFinal(workblocksFinal.concat(selectedWorkblocks));
    console.log(workblocksFinal);
  }
  return (
    <div className="divCreateVehicleServiceUI" data-testid="vehicleServiceTest">
      <h1>Create New Vehicle Service</h1>
      <div className="divCreate" data-testid="createVehicleServiceTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="vehicleServiceNameTextTest">Vehicle Service Name: </label>
          <input
            data-testid="vehicleServiceNameTest"
            type="textInput"
            name="vehicleServiceName"
            ref={register}
            placeholder="Vehicle Service Name"
          />
          <br />
          <label data-testid="vehicleServiceCodeTextTest">Vehicle Service Code: </label>
          <input
            data-testid="vehicleServiceCodeTest"
            type="textInput"
            name="vehicleServiceCode"
            ref={register}
            placeholder="Vehicle Service Code"
          />
          <br />
          <label data-testid="vehicleServiceColorTextTest">Vehicle Service Color: </label>
          <input
            data-testid="vehicleServiceColorTest"
            type="textInput"
            name="vehicleServiceColor"
            ref={register}
            placeholder="Vehicle Service Color"
          />
          <br />
          <br />
          <label data-testid="driverTypeTextTest">Workblocks Codes: </label>
          <select
            data-testid="linePathSelectTest"
            onChange={(e) => setSelectedWorkblocks(e.target.value)}>
            {workblocks.map((workblock) => (
              <option key={workblock.value} value={workblock.value}>
                {workblock.label}
              </option>
            ))}
            <option selected disabled hidden>
              {" "}
              Workblocks Codes
            </option>
          </select>
          <button
            data-testid="driverAddDriverTypeTest"
            type="button"
            className="buttonCreate"
            onClick={addWorkBlock}
          >
            Add Workblocks Codes
          </button>
          <input
            data-testid="driverTypeTest"
            type="hidden"
            name="workblockList"
            value={JSON.stringify(workblocksFinal)}
            ref={register}
          />
          <select name="addedPaths" size="5">
            {workblocksFinal.map(dt => (
              <option>Workblocks Code: {dt}</option>))}
          </select>
          <input data-testid="submitTest" type="submit" value="Submit" onClick={openModal} />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal">
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
export default CreateDriver;