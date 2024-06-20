import React, { useState } from 'react';
import './Table.css';
import Links from "../../Links"

export default function ListVS() {

    const [date, setDate] = useState("");
    const [searchedVS, setSearchedVS] = useState([]);

    const fetchVSByDate = async () => {
        
        const data = await fetch(
            Links.MDV_URL()+"/api/VehicleService/date/" + date
        );
        const vsList = await data.json();
        setSearchedVS(vsList);

    };
    function searchByDate() {
        fetchVSByDate();

    }

    function fillWorkblockCode(list) {
        var wbCode = "";
        if (list.length !== 0) {
            list.map((elem) => (
                wbCode = wbCode + elem.workblockCode.code + "; "
            ))
        }
        return wbCode
    }

    return (
        <div className="divCreateLineUI" data-testid="lineTest">
            <h1>List Vehicle Service By Date</h1>
            <br />
            <div className="divCreate" data-testid="createLineTest">
                <label data-testid="lineIDTextTest">Date:(DD-MM-YYYY) </label>
                <input
                    data-testid="lineIDTest"
                    type="textInput"
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Vehicle Service Date" />
                <button
                    data-testid="driverAddDriverTypeTest"
                    type="button"
                    className="buttonCreate"
                    onClick={searchByDate}
                >
                    Search
          </button>
            </div>
            <table className="table">
                <tr>
                    <th>Vehicle Service Name</th>
                    <th>Vehicle Service Code</th>
                    <th>Vehicle Service Color</th>
                    <th>Workblock Code</th>
                </tr>
                {searchedVS.map((vs) => (
                    <tr>
                        <td>{vs.vehicleServiceName}</td>
                        <td>{vs.vehicleServiceCode}</td>
                        <td>{vs.vehicleServiceColor}</td>
                        <td>{fillWorkblockCode(vs.workblockList)}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}