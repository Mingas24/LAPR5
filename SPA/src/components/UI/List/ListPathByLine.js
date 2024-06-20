import React, { useState } from "react";
import "./Table.css";
import axios from "axios";
import Links from "../../Links"

export default function ListPath() {
  const [line, setLine] = useState("");
  const [searchedPath, setSearchedPath] = useState([]);

  const fetchPathByName = async () => {
    axios
      .get(Links.MDR_URL()+"/api/lines/pathByLineID", {
        params: { name: line },
      })
      .then((response2) => {
        const pathList = response2.data;
        setSearchedPath(pathList);
      });
  };
  function searchByPath() {
    fetchPathByName();
  }

  function fillWorkblockCode(list) {
    var st = "";

    list.map(
      (elem) =>
        (st = st + 
          "First Node: " +
          elem.node1 +
          " | Second Node:" +
          elem.node2 +
          " | Duration:" +
          elem.duration +
          " | Distance: " +
          elem.distance +
          ";")
    );

    return st;
  }

  function verifyIsEmpty(isEmpty) {
    var isEmptyString = "";
    if (isEmpty === true) {
      isEmptyString = "True";
      return isEmptyString;
    } else {
      isEmptyString = "False";
      return isEmptyString;
    }
  }

  return (
    <div className="divListPathUI" data-testid="listPathTest">
      <h1>List Path By Line </h1>
      <br />
      <div className="divCreate" data-testid="createLineTest">
        <label data-testid="lineIDTextTest">Line Name </label>
        <input
          data-testid="lineIDTest"
          type="textInput"
          name="line"
          onChange={(e) => setLine(e.target.value)}
          placeholder="Line Name"
        />
        <button
          data-testid="addPathTest"
          type="button"
          className="buttonCreate"
          onClick={searchByPath}
        >
          Search
        </button>
      </div>
      <table className="table">
        <tr>
          <th>Path ID</th>
          <th>Is Empty</th>
          <th>Path Node</th>
        </tr>
        {searchedPath.map((vs) => (
          <tr>
            <td>{vs.key}</td>
            <td>{verifyIsEmpty(vs.isEmpty)}</td>
            <td>{fillWorkblockCode(vs.pathNode)}</td>

          </tr>
        ))}
      </table>
    </div>
  );
}
