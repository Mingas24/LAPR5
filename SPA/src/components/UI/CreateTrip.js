import React, { useState, useEffect } from "react";
import "../../App.css";
import "../UI/General.css";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Links from "../Links"

//https://demo.mobiscroll.com/react/datetime
//http://help.mobiscroll.com/en/articles/1195431-installing-mobiscroll-with-npm
function CreateTrip() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetchPaths();
    fetchLines();
  }, []);

  const [pathNodes, setPathNodes] = useState([]);
  const [lines, setLines] = useState([]);
  const [sendNodes, setSendNodes] = useState([]);
  const [sendTimes, setSendTimes] = useState([]);

  const fetchPaths = async () => {
    const data = await fetch(
      Links.MDR_URL()+"/api/path/listPaths"
    );
    const paths = await data.json();
    setPathNodes(
      paths.map((pathnode) => ({
        label: pathnode.key,
        value: pathnode.pathNode,
      }))
    );
  };

  const fetchLines = async () => {
    const data = await fetch(Links.MDR_URL()+"/api/lines");
    const lines = await data.json();
    setLines(
      lines.map((line) => ({
        label: line.name,
        id: line.lineID,
        path: line.linePath,
      }))
    );
  };

  const [result, setResult] = useState("");

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    addTimes(data);
    data.nodes = sendNodes;
    data.times = sendTimes;
    console.log(JSON.stringify(data));
    fetch(Links.MDV_URL()+"/api/Trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.status);
        if (!response.ok) {
          const error = data.message || response.status;
          setResult("Error creating new Trip!");
          return error.toString();
        }
        setResult("Trip created with success!");
        window.location.reload();
        return response.json();
      })
      .then((data) => console.log(data));
  };

  function addTimes(data) {
    var time = data.startTime.split(":", [2]);
    var minutesinSeconds = parseInt(time[1]) * 60;
    // var t = time[0].split(" ", [2]);
    var hoursinSeconds = parseInt(time[0]) * 3600;
    const seconds = minutesinSeconds + hoursinSeconds;
    let auxa = 0;
    for (let i = 0; i < pathNodes.length; i++) {
      if (pathNodes[i].label.split(":")[1] === data.pathID) {
        let test = pathNodes[i].value;
        for (let j = 0; j < test.length; j++) {
          let node1 = test[j].node1;
          let node2 = test[j].node2;
          let duration = parseInt(test[j].duration);

          if (j === 0) {
            sendNodes.push(node1);
            sendTimes.push(seconds);
            setSendNodes(sendNodes);
            setSendTimes(sendTimes);
            auxa = duration;
          } else if (j < test.length - 1) {
            sendNodes.push(node1);
            sendTimes.push(seconds + auxa);
            setSendNodes(sendNodes);
            setSendTimes(sendTimes);
            auxa = auxa + duration;
          } else if (j === test.length - 1) {
            sendNodes.push(node1);
            sendTimes.push(seconds + auxa);
            setSendNodes(sendNodes);
            setSendTimes(sendTimes);
            sendNodes.push(node2);
            sendTimes.push(seconds + auxa + duration);
            setSendNodes(sendNodes);
            setSendTimes(sendTimes);
          }
        }
      }
    }
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setResult("");
  }
  return (
    <div className="divCreateTripUI" data-testid="tripTest">
      <h1>Create New Trip</h1>
      <div className="divCreate" data-testid="createTripTest">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label data-testid="tripCodeTextTest">Trip Code(TXXXX):</label>
          <br />
          <input
            data-testid="tripCodeTest"
            type="text"
            name="tripCode"
            ref={register}
            placeholder="Code of the new Trip"
          />
          <label data-testid="lineIDTextTest">Line Name: </label>
          <select
            data-testid="lineIDSelectTest"
            // onChange={(e) => setSelectedLine(e.target.value)}
            name="lineID"
            ref={register}
          >
            {lines.map((line) => (
              <option value={line.id}>{line.label}</option>
            ))}
            <option selected disabled hidden>
              {" "}
              Line ID
            </option>
          </select>
          <br />
          <label data-testid="pathIDTextTest">Path Go: </label>
          <select
            data-testid="pathIDSelectTest"
            // onChange={(e) => setSelectedPath(e.target.value)}
            name="pathID"
            ref={register}
          >
            {pathNodes.map((path) => (
              <option value={path.label.split(":")[1]}>{path.label}</option>
            ))}
            <option selected disabled hidden>
              {" "}
              Path ID
            </option>
          </select>
          <label data-testid="pathIDTextTest">Path Return: </label>
          <select
            data-testid="pathIDSelectTest"
            // onChange={(e) => setSelectedPath(e.target.value)}
            name="pathIDReturn"
            ref={register}
          >
            {pathNodes.map((path) => (
              <option value={path.label.split(":")[1]}>{path.label}</option>
            ))}
            <option selected disabled hidden>
              {" "}
              Path ID
            </option>
          </select>
          <br />
          <label data-testid="dateTextTest">Date(DD-MM-YYYY):</label>
          <br />
          <input
            data-testid="dateTest"
            type="string"
            name="startDate"
            ref={register}
            placeholder="Date of the new Trip"
          />
          <br />
          <label data-testid="dateTimeTextTest">Time(HH:MM):</label>
          <br />
          <input
            data-testid="dateTimeTest"
            type="string"
            name="startTime"
            ref={register}
            placeholder="Time of the new Trip"
          />
          <br />
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
export default CreateTrip;
