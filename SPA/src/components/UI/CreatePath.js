import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import axios from "axios";
import Links from "../Links"

function CreatePath() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchNodes();
  });

  const [nodes, setNodes] = useState([]);
  const [selectedNode1, setSelectedNode1] = useState("");
  const [selectedNode2, setSelectedNode2] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [pathNodes, setPathNodes] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(Boolean);

  const fetchNodes = async () => {
    const data = await fetch(Links.MDR_URL()+"/api/nodes");
    const nodes = await data.json();
    setNodes(nodes.map((node) => ({ label: node.name, value: node.nodeID })));
  };

  function addPathNode() {
    var pathNodeArray = {
      node1: selectedNode1,
      node2: selectedNode2,
      duration: 1,
      distance: 2,
    };
  }

  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    fetch(Links.MDR_URL()+"/api/path", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Path!");
          return error.toString();
        }
        setResult("Path created with success!");
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

  function addPathNode() {
    var pathNode = {
      node1: selectedNode1,
      node2: selectedNode2,
      duration: document.getElementById("1").value,
      distance: document.getElementById("2").value,
    };
    setPathNodes(pathNodes.concat(pathNode));
  }

  return (
    <div data-testid="createPathTest">
      <h1>Create New Path</h1>
      <div className="divCreate" data-testid="pathTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="pathKeyTextTest">Key: </label>
          <input
            data-testid="pathKeyTest"
            type="string"
            name="key"
            ref={register}
            placeholder="Key of the new Path"
          />
          <br />
          <label data-testid="pathIsEmptyTextTest">Is Empty:</label>
          <select data-testid="pathIsEmptySelectTest" onChange={(e) => setSelectedEmp(e.target.value)}>
            <option data-testid="pathIsEmptyTrueTest" value={"true"}>True</option>
            <option data-testid="pathIsEmptyFalseTest" value={"false"}>False</option>
            <option selected disabled hidden>
              IsEmpty
            </option>
          </select>
          <h3>Path Segments:</h3>
          <label data-testid="pathPathNode1TextTest">PathNode 1:</label>
          <select data-testid="pathPathNode1SelectTest" onChange={(e) => setSelectedNode1(e.target.value)}>
            {nodes.map((node) => (
              <option key={node.value} value={node.label}>
                {node.label}
              </option>
            ))}
            <option selected disabled hidden>
              {" "}
              Path Node
            </option>
          </select>
          <label data-testid="pathPathNode2TextTest">PathNode 2:</label>
          <select data-testid="pathPathNode2SelectTest" onChange={(e) => setSelectedNode2(e.target.value)}>
            {nodes.map((node) => (
              <option key={node.value} value={node.label}>
                {node.label}
              </option>
            ))}
            <option selected disabled hidden>
              {" "}
              Path Node
            </option>
          </select>
          <label data-testid="pathDurationTextTest">Duration:</label>
          <input data-testid="pathDurationTest"
            type="number"
            name="duration"
            id="1"
            //ref={register}
            placeholder="Duration of the new Path"
          />
          <br />
          <br />
          <label data-testid="pathDistanceTextTest">Distance:</label>
          <input data-testid="pathDistanceTest"
            type="number"
            name="distance"
            id="2"
            //ref={register}
            placeholder="Distance of the new Path"
          />
          <button data-testid="pathAddNewSegmentButtonTest" type="button" className="buttonCreate" onClick={addPathNode}>
            Add New Segment
          </button>
          <input
            data-testid="pathIsEmptyTest"
            type="hidden"
            name="isEmpty"
            value={selectedEmp}
            ref={register}
          />
          <input
            data-testid="pathPathNodeTest"
            type="hidden"
            name="pathNode"
            value={JSON.stringify(pathNodes)}
            ref={register}
          />
          <select name="addedPaths" size="5">
            {pathNodes.map(pathNode => (
                  <option>First Node ID:{pathNode.node1}   Second Node ID:{pathNode.node2}   Distance:{pathNode.distance}   Duration: {pathNode.duration}</option>))}
              </select>
          <input type="submit" data-testid="submitTest" value="Submit" onClick={openModal} />
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

export default CreatePath;
