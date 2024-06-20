import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

function CreateNode() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchNodes();
  }, []);

  const [selectedID, setSelectedID] = useState(Number);
  const [selectedDuration, setSelectedDuration] = useState(Number);
  const [result, setResult] = useState("");
  const [nodes, setNode] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState(Boolean);
  const [selectedRelief, setSelectedRelief] = useState(Boolean);
  const [crewTime, setCrewTime] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");

  const fetchNodes = async () => {
    const data = await fetch(Links.MDR_URL()+"/api/nodes/");
    const nodes = await data.json();
    setNode(nodes.map((node) => ({ label: node.name, value: node.nodeID })));
  };

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    console.log(Links.MDR_URL()+"/api/nodes");
      fetch(Links.MDR_URL()+"/api/nodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Node!");
          return error.toString();
        }
        setResult("Node created with success!");
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

  function addCrewTime() {
    var crewTimeArray = {
      id: document.getElementById("1").value,
      nodeID: selectedNode,
      duration: document.getElementById("2").value,
    };
    setCrewTime(crewTime.concat(crewTimeArray));
  }
  return (
    <div data-testid="nodeTest" >
      <h1>Create New Node</h1>
      <div className="divCreate" data-testid="createNodeTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="nodeIDTextTest">Node ID: </label>
          <input
            data-testid="nodeIDTest"
            type="number"
            name="nodeID"
            ref={register}
            placeholder="ID of the new Node"
          />
          <br />
          <label data-testid="nodeNameTextTest">Name: </label>
          <input
            data-testid="nodeNameTest"
            type="textInput"
            name="name"
            ref={register}
            placeholder="Name of the new Node"
          />
          <br />
          <label data-testid="nodeLatitudeTextTest">Latitude: </label>
          <input
            data-testid="nodeLatitudeTest"
            type="float"
            name="latitude"
            ref={register}
            placeholder="Latitude of the new Node"
          />
          <br />
          <br />
          <label data-testid="longitudeTextTest">Longitude: </label>
          <input
            data-testid="nodeLongitudeTest"
            type="float"
            name="longitude"
            ref={register}
            placeholder="Longitude of the new Node"
          />
          <br />
          <br />
          <label data-testid="nodeShortNameTextTest">Short Name: </label>
          <input
            data-testid="nodeShortNameTest"
            type="textInput"
            name="shortName"
            ref={register}
            placeholder="Short Name of the new Node"
          />
          <br />
          <label data-testid="nodeIsDepotTextTest">Is Depot:</label>
          <select data-testid="nodeIsDepotSelectTest" onChange={(e) => setSelectedDepot(e.target.value)}>
            <option  data-testid="nodeIsDepotTrueTest" value={"true"} selected>True</option>
            <option  data-testid="nodeIsDepotFalseTest" value={"false"} selected>False</option>
            <option selected disabled hidden>
              IsDepot
            </option>
          </select>
          <br />
          <br />
          <label data-testid="nodeIsReliefTextTest">Is Relief Point:</label>
          <select data-testid="nodeIsReliefSelectTest" onChange={(e) => setSelectedRelief(e.target.value)}>
            <option data-testid="nodeIsReliefTrueTest" value={"true"} selected>True</option>
            <option data-testid="nodeIsReliefFalseTest" value={"false"} selected>False</option>
            <option selected disabled hidden>
              IsReliefPoint
            </option>
          </select>
          <br />
          <label data-testid="nodeIsCrewTravelTimeTextTest">Crew Travel Time :</label>
          <br />
          <input
            data-testid="nodeIsCrewTravelTimeInputTest"
            type="number"
            name="id"
            id="1"
            //ref={setSelectedID}
            placeholder="ID of the Crew travel time for that node"
          />
          <select data-testid="nodeIsCrewTravelTimeSelectTest" onChange={(e) => setSelectedNode(e.target.value)}>
            {nodes.map((node) => (
              <option key={node.value} value={node.value} selected>
                {node.label}
              </option>
            ))}
            <option selected disabled hidden>
              {" "}
              ID of the Node
            </option>
          </select>
          <input
            data-testid="nodeIsCrewTravelTimeDurationTest"
            type="number"
            name="duration"
            id="2"
            // ref={setSelectedDuration}
            placeholder="Duration of the Crew travel time for that node"
          />
          <br />
          <button data-testid="nodeAddCrewTravelTimeTest" type="button" className="buttonCreate" onClick={addCrewTime}>
            Add Crew Travel Time
          </button>
          <input
            data-testid="nodeIsDepotTest"
            type="hidden"
            name="isDepot"
            value={selectedDepot}
            ref={register}
          />
          <input
            data-testid="nodeIsReliefTest"
            type="hidden"
            name="isReliefPoint"
            value={selectedRelief}
            ref={register}
          />
          <input
            data-testid="nodeCrewTravelTimeTest"
            type="hidden"
            name="crewTravelTime"
            value={JSON.stringify(crewTime)}
            ref={register}
          />
          <select name="addedCrew" size="5">
            {crewTime.map(crewTimeSingle=>(
              <option>Crew Travel Time ID:{crewTimeSingle.id}   Node ID:{crewTimeSingle.nodeID}   Duration:{crewTimeSingle.duration} </option>
            )) 
            }
              </select>
          <input type="submit" data-testid="submitTest"  value="Submit" onClick={openModal} />
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

export default CreateNode;
