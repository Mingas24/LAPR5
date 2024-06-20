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
            Links.MDR_URL()+"/api/nodes"
        );
        const vsList = await data.json();
        setNodeList(vsList);
    };

    function fillCrewTravelTime(list) {
        var wbCode = "";
        if (list.length !== 0) {
            list.map((elem) => (
                wbCode = wbCode + "ID:" + elem.id +
                " | Node ID:" + elem.nodeID +
                " | Duration:" + elem.duration
            ))
        }
        return wbCode
    }

    function verifyIsDepot(isDepot) {
        var isDepotString = "";
        if (isDepot === true) {
            isDepotString = "True";
            return isDepotString;
        } else {
            isDepotString = "False";
            return isDepotString;
        }
    }

    function verifyIsRelief(isRelief) {
        var isReliefString = "";
        if (isRelief === true) {
            isReliefString = "True";
            return isReliefString;
        } else {
            isReliefString = "False";
            return isReliefString;
        }
    }
    return (
        <div className="divCreateLineUI" data-testid="lineTest">
            <h1>List Nodes</h1>
            <br />
            <table className="table">
                <tr>
                    <th>Node ID</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Short Name</th>
                    <th>Is Depot</th>
                    <th>Is Relief Point</th>
                    <th>Crew Travel Time</th>
                </tr>
                {nodeList.map((node) => (
                    <tr>
                        <td>{node.nodeID}</td>
                        <td>{node.name}</td>
                        <td>{node.latitude}</td>
                        <td>{node.longitude}</td>
                        <td>{node.shortName}</td>
                        <td>{verifyIsDepot(node.isDepot)}</td>
                        <td>{verifyIsRelief(node.isReliefPoint)}</td>
                        <td>{fillCrewTravelTime(node.crewTravelTime)}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}