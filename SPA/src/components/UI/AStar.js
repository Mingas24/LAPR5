import React, { useState } from "react";
import './General.css'
import Links from "../Links"

function BestPath() {
  const [result, setResult] = useState([]);

  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var url = new URL(Links.UVM_URL()+":3000/api/aStar");

    url.searchParams.append("node1", node1);
    url.searchParams.append("node2", node2);
    url.searchParams.append("time", time);

    const fetchData = async () => {
      const info = await fetch(url);
      if (info.ok) {
        const data = await info.json();

        setResult(data);
        fetchData({});
      } else {
        alert("Error");
      }
    };

    fetchData();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} method="GET">
          <label>Node 1:</label>
          <input
            type="textInput"
            name="node1"
            value={node1}
            onChange={(e) => setNode1(e.target.value)}
          />
          <br />

          <label>Node 2:</label>
          <input
            type="textInput"
            name="node2"
            value={node2}
            onChange={(e) => setNode2(e.target.value)}
          />
          <br />
          <label>Time To Catch:</label>
          <input
            type="number"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <br />

          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {result.path === undefined
              ? ""
              : result.path.map((elem) => (
                  <tr>
                    <td>{elem.shortName}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {/* <label></label> */}
      </div>
    </div>
  );
}

export default BestPath;
