import React, { useState } from 'react';
import './Table.css';
import Links from "../../Links"

export default function ListVS() {

    const [date, setDate] = useState("");
    const [searchedVS, setSearchedVS] = useState([]);

    const fetchVSByDate = async () => {
        console.log( Links.MDV_URL()+"/api/CrewService/date/" + date);
        const data = await fetch(  
            Links.MDV_URL()+"/api/CrewService/date/" + date
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
            <h1>List Crew Service By Date</h1>
            <br />
            <div className="divCreate" data-testid="createLineTest">
                <label data-testid="lineIDTextTest">Date:(DD-MM-YYYY) </label>
                <input
                    data-testid="lineIDTest"
                    type="textInput"
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Crew Service Date" />
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
                    <th>Crew Service Code</th>
                    <th>Workblock Code</th>
                </tr>
                {searchedVS.map((vs) => (
                    <tr>
                        <td>{vs.code}</td>
                        <td>{fillWorkblockCode(vs.workblocks)}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}