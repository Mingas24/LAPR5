import React, { useState } from "react";
import axios from "axios";
import './General.css'
import Links from "../Links"

function DriverDuty() {
  const [result, setResult] = useState([]);

  const [generation, setGeneration] = useState("");
  const [population, setPopulation] = useState("");
  const [vehicleID, setvehicleID] = useState("");
  const [prob_cross, setPC] = useState("");
  const [prob_mutacao, setPM] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get( Links.UVM_URL()+":3000/api/DriverDuty", {
        params: {
          generation: generation,
          population: population,
          vehicleID: vehicleID,
          prob_cross: prob_cross,
          prob_mutacao: prob_mutacao,
        },
      })
      .then((response) => {
        console.log(response.data);
        setResult(response.data);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} method="GET">
          <label>Number of Generations:</label>
          <input
            type="number"
            name="generation"
            value={generation}
            onChange={(e) => setGeneration(e.target.value)}
          />
          <br />

          <label>Number of Population:</label>
          <input
            type="number"
            name="population"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
          />
          <br />
          <label>Vehicle ID:</label>
          <input
            type="number"
            name="vehicleID"
            value={vehicleID}
            onChange={(e) => setvehicleID(e.target.value)}
          />
          <br />
          <label>Probability of Cross:</label>
          <input
            type="number"
            name="prob_cross"
            value={prob_cross}
            onChange={(e) => setPC(e.target.value)}
          />
          <br />
          <label>Probability of Mutation:</label>
          <input
            type="number"
            name="prob_mutacao"
            value={prob_mutacao}
            onChange={(e) => setPM(e.target.value)}
          />
          <br />
          <input id="submit" type="submit" value="Submit" />
          <select name="driverDuty" size="5">
            {result.ind === undefined
              ? ""
              : result.ind.map((ind) => <option>Individual: {ind}</option>)}
          </select>
          {/* <div>
            <table>
              <thead>
                <tr>
                  <th>Driver Duty</th>
                </tr>
              </thead>
              <tbody>
                {result.ind === undefined
                  ? ""
                  : result.ind.map((elem) => (
                      <tr>
                        <td>{elem.ind}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default DriverDuty;
