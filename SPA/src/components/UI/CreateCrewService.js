import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

//https://demo.mobiscroll.com/react/datetime
//http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm
function CreateCrewService() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchWorkblocks();
  }, []);

  const [workblock, setWorkblock] = useState([]);
  const [selectedWorkblock, setSelectedWorkblock] = useState([]);
  const [workblockFinal, setWorkblockFinal] = useState([]);

  const fetchWorkblocks = async () => {
    const data = await fetch(
      Links.MDV_URL()+"/api/Workblock"
    );
    const workblock = await data.json();
    setWorkblock(
      workblock.map((workblock) => ({
        label: workblock.workblockCode,
        value: workblock.workblockCode,
      }))
    );
  };

  function addWorkblocks() {
    setWorkblockFinal(workblockFinal.concat(selectedWorkblock));
  }

  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    data.Workblocks = JSON.parse(data.Workblocks);
    fetch(Links.MDV_URL()+"/api/CrewService", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Crew Service!");
          return error.toString();
        }
        setResult("Crew Service created with success!");
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

  return (
    <div className="divCreateCrewServiceUI" data-testid="CrewServiceTest">
      <h1>Create New Crew Service</h1>
      <div className="divCreate" data-testid="createCrewServiceTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="CodeTextTest">
            Crew Service Code (CXXXX):{" "}
          </label>
          <input
            data-testid="CodeTest"
            type="textInput"
            name="Code"
            ref={register}
            placeholder="CrewService Code"
          />
          <br />
          <label data-testid="tripsTextTest">Workblocks: </label>
          <select
            data-testid="tripsSelectTest"
            onChange={(e) => setSelectedWorkblock(e.target.value)}
          >
            {workblock.map((workblock) => (
              <option value={workblock.value}>{workblock.label}</option>
            ))}
            <option selected disabled hidden>
              {" "}
              Workblock Code
            </option>
          </select>
          <button
            data-testid="tripButtonTest"
            type="button"
            className="buttonCreate"
            onClick={addWorkblocks}
          >
            Add New Workblock
          </button>
          <input
            data-testid="workblocksTest"
            type="hidden"
            name="Workblocks"
            value={JSON.stringify(workblockFinal)}
            ref={register}
          />
          <select name="addedWorkblocks" size="5">
            {workblockFinal.map((workblock) => (
              <option>Workblock Code:{workblock}</option>
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
export default CreateCrewService;
