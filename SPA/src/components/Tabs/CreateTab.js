import React from "react";
import Navbar from 'react-bootstrap/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
//import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import '../../App.css';

class CreateTab extends React.Component {
  render() {
    return (
      <div>
        <Navbar expand="lg">
                    <Nav className="mr-auto" bg="light">    
                        <Nav.Link href="/admin/create/node">Create Node</Nav.Link>
                        <Nav.Link href="/admin/create/path">Create Path</Nav.Link>
                        <Nav.Link href="/admin/create/line">Create Line</Nav.Link>
                        <Nav.Link href="/admin/create/driver">Create Driver</Nav.Link>
                        <Nav.Link href="/admin/create/vehicle">Create Vehicle</Nav.Link>
                        <Nav.Link href="/admin/create/vehicleService">Create Vehicle Service</Nav.Link>
                        <Nav.Link href="/admin/create/vehicleType">Create Vehicle Type</Nav.Link>
                        <Nav.Link href="/admin/create/driverType">Create Driver Type</Nav.Link>
                        <Nav.Link href="/admin/create/trip">Create Trip</Nav.Link>
                        <Nav.Link href="/admin/create/trips">Create Trips For Line</Nav.Link>
                        <Nav.Link href="/admin/create/workblock">Create Workblock</Nav.Link>
                        <Nav.Link href="/admin/create/crewService">Create Crew Service</Nav.Link>
                    </Nav>
            </Navbar>
      </div>
    );
  }
}

export default CreateTab;
