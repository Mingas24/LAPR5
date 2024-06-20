import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

function CreateLine() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchPaths();
  }, []);

  const [paths, setPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [selectedOrientation, setSelectedOrientation] = useState("");
  const [linePaths, setLinePaths] = useState([]);

  const fetchPaths = async () => {
    const data = await fetch(
      Links.MDR_URL()+"/api/path/listPaths"
    );
    const paths = await data.json();
    setPaths(paths.map((path) => ({ label: path.key, value: path.key })));
  };
  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    fetch(Links.MDR_URL()+"/api/lines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Line!");
          return error.toString();
        }
        setResult("Line created with success!");
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
    var linePathArray = {
      pathID: selectedPath,
      orientation: selectedOrientation,
    };
    setLinePaths(linePaths.concat(linePathArray));
  }

  return (
    <div className="divCreateLineUI" data-testid="lineTest">
      <h1>Create New Line</h1>
      <div className="divCreate" data-testid="createLineTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="lineIDTextTest">Line ID: </label>
          <input
            data-testid="lineIDTest"
            type="number"
            name="lineID"
            ref={register}
            placeholder="ID of the new Line"
          />
          <br />
          <label data-testid="lineNameTextTest">Name: </label>
          <input
            data-testid="lineNameTest"
            type="textInput"
            name="name"
            ref={register}
            placeholder="Name of the new Line"
          />
          <br />
          <label data-testid="colorTextTest">Color: </label>
          <input
            data-testid="colorTest"
            type="textInput"
            name="color"
            ref={register}
            placeholder="Color of the new Line"
          />
          <br />
          <label data-testid="linePathTextTest">Line Path: </label>
          <select
            data-testid="linePathSelectTest"
            onChange={(e) => setSelectedPath(e.target.value)}
          >
            {paths.map((path) => (
              <option key={path.value} value={path.value}>
                {path.label}
              </option>
            ))}
            <option selected disabled hidden>
              {" "}
              Path ID
            </option>
          </select>
          <select
            data-testid="lineOrientationSelectTest"
            onChange={(e) => setSelectedOrientation(e.target.value)}
          >
            <option data-testid="lineOrientationGoTest" key={"Go"} value={"Go"}>
              Go
            </option>
            <option
              data-testid="lineOrientationReturnTest"
              key={"Return"}
              value={"Return"}
            >
              Return
            </option>
            <option selected disabled hidden>
              Orientation
            </option>
          </select>
          <button
            data-testid="lineAddLinePathTest"
            type="button"
            className="buttonCreate"
            onClick={addLinePath}
          >
            Add Line Path
          </button>
          <input
            data-testid="linePathTest"
            type="hidden"
            name="linePath"
            value={JSON.stringify(linePaths)}
            ref={register}
          />
          <select name="addedPaths" size="5">
            {linePaths.map(linePath => (
              <option>Code: {linePath.pathID}  Orientation: {linePath.orientation}</option>
            ))}
          </select>
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

export default CreateLine;
