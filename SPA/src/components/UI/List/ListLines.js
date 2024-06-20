import React, { useState, useEffect } from 'react';
import './Table.css';
import Links from "../../Links"

export default function ListVS() {

    useEffect(() => {
        fetchNode();
    }, []);

    const [nodeList, setNodeList] = useState([]);

    const fetchNode = async () => {
        const data = await fetch(
            Links.MDR_URL()+"/api/lines"
        );
        const vsList = await data.json();
        setNodeList(vsList);
    };

    function fillCrewTravelTime(list) {
        var wbCode = "";
        var aux = [];
        if (list.length !== 0) {
            list.map((elem) => (
                aux = elem.pathID.split(":"),
                wbCode = wbCode + "Orientation:"+ elem.orientation + 
                " | Path ID:"+ aux[1] + " ; "
            ))
        }
        return wbCode
    }

    return (
        <div className="divCreateLineUI" data-testid="lineTest">
            <h1>List Nodes</h1>
            <br />
            <table className="table">
                <tr>
                    <th>Line ID</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>LinePath</th>
                </tr>
                {nodeList.map((node) => (
                    <tr>
                        <td>{node.lineID}</td>
                        <td>{node.name}</td>
                        <td>{node.color}</td>
                        <td>{fillCrewTravelTime(node.linePath)}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}