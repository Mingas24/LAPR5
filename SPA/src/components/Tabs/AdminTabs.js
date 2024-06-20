import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import '../../App.css';

export default function AdminTabs() {

    
    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand href="/admin/">Paredes Bus Network</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" bg="light">
                        <Nav.Link href="/map">Map</Nav.Link>
                        <Nav.Link href="/admin/create">Create</Nav.Link>
                        <Nav.Link href="/list">List</Nav.Link>
                        <Nav.Link href="/admin/import">Import</Nav.Link>
                        <Nav.Link href="/admin/bestPath">Best Path</Nav.Link>
                        <Nav.Link href="/admin/driverDuty">Driver Duty</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

