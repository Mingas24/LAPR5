import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

//https://demo.mobiscroll.com/react/datetime
//http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm

function CreateDriver() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchDriverTypes();
  }, []);

  const [driverTypes, setDriverType] = useState([]);
  const [selectedDriverTypes, setSelectedDriverTypes] = useState("");
  const [driverTypesFinal, setDriverTypesFinal] = useState([]);

  const fetchDriverTypes = async () => {
    const data = await fetch(
      Links.MDR_URL() + "/api/driver/listDriverTypes"
    );
    const driverTypes = await data.json();
    setDriverType(driverTypes.map((driverType) => (
      { label: driverType.description, value: driverType.id })));
  };
  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    data.driverType = JSON.parse(data.driverType);
    fetch(Links.MDV_URL() + "/api/Driver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Driver!");
          return error.toString();
        }
        setResult("Driver created with success!");
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
  function addLinePath() {
    // var driverTypeArray = {
    //   selectedDriverTypes
    // };
    setDriverTypesFinal(driverTypesFinal.concat(selectedDriverTypes));
    console.log(driverTypesFinal)
    console.log(selectedDriverTypes)
  }
  return (
    <div className="divCreateDriverUI" data-testid="driverTest">
      <h1>Create New Driver</h1>
      <div className="divCreate" data-testid="createDriverTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="driverNameTextTest">Driver Name: </label>
          <input
            data-testid="driverNameTest"
            type="textInput"
            name="driverName"
            ref={register}
            placeholder="Driver Name"
          />
          <br />
          <label data-testid="driverDateTextTest">Birth Date: </label>
          <input
            data-testid="driverDateTest"
            type="textInput"
            name="birthDate"
            ref={register}
            placeholder="Birth Date"
          />
          <br />
          <label data-testid="driverCCTextTest">Citizen Card Number: </label>
          <input
            data-testid="driverCCTest"
            type="number"
            name="citizenCardNumber"
            ref={register}
            placeholder="Citizen Card Number"
          />
          <br />
          <label data-testid="driverNIFTextTest">Driver Tax Identification Number: </label>
          <input
            data-testid="driverNIFTest"
            type="number"
            name="driverNIF"
            ref={register}
            placeholder="Tax Identification Number"
          />
          <br />
          <br />
          <label data-testid="driverNumberTextTest">Mecanographic Number: </label>
          <input
            data-testid="driverNumberTest"
            type="textInput"
            name="mecanographicNumber"
            ref={register}
            placeholder="Mecanographic Number"
          />
          <br />
          <label data-testid="entryDateTextTest">Driver Company Entry Date: </label>
          <input
            data-testid="entryDateTest"
            type="textInput"
            name="entryDate"
            ref={register}
            placeholder="Driver Company Entry Date"
          />
          <label data-testid="leavingDateTextTest">Driver Company Leaving Date: </label>
          <input
            data-testid="leavingDateTest"
            type="textInput"
            name="leavingDate"
            ref={register}
            placeholder="Driver Company Leaving Date"
          />
          <br />
          <label data-testid="driverTypeTextTest">Driver Type: </label>
          <select
            data-testid="linePathSelectTest"
            onChange={(e) => setSelectedDriverTypes(e.target.value)}>
            {driverTypes.map((driverType) => (
              <option key={driverType.value} value={driverType.value}>
                {driverType.label}
              </option>
            ))}
            <option selected disabled hidden>
              {" "}
              Driver Type ID
            </option>
          </select>
          <button
            data-testid="driverAddDriverTypeTest"
            type="button"
            className="buttonCreate"
            onClick={addLinePath}
          >
            Add Driver Type
          </button>
          <input
            data-testid="driverTypeTest"
            type="hidden"
            name="driverType"
            value={JSON.stringify(driverTypesFinal)}
            ref={register}
          />
          <select name="addedPaths" size="5">
            {driverTypesFinal.map(dt => (
              <option>Driver Type: {dt}</option>))}
          </select>
          <br />
          <h3>Driver Licence:</h3>
          <label data-testid="licenseNumberTextTest">Driver Licence Number: </label>
          <input
            data-testid="driverLicenceNumberTest"
            type="textInput"
            name="dln"
            ref={register}
            placeholder="Driver Licence Number"
          />
          <br />
          <label data-testid="leavingDateTextTest">Driver Licence Expiry Date: </label>
          <input
            data-testid="driverLicenceExpiryDateTest"
            type="textInput"
            name="dled"
            ref={register}
            placeholder="Driver Licence Expiry Date"
          />
          <br />

          <input data-testid="submitTest" type="submit" value="Submit" onClick={openModal} />
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
export default CreateDriver;