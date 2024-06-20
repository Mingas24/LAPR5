import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import '../../App.css';

export default function NormalTabs() {
    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand href="/user">Paredes Bus Network</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" bg="light">
                        <Nav.Link href="map">Map</Nav.Link>
                        <Nav.Link href="list">List</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/logout">Logout</Nav.Link>   
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
