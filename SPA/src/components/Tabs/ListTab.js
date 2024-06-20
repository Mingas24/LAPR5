import React from "react";
import Navbar from 'react-bootstrap/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
//import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import '../../App.css';

class ListTab extends React.Component {
  render() {
    return (
      <div>
        <Navbar expand="lg">
                    <Nav className="mr-auto" bg="light">    
                        <Nav.Link href="list/listVS">List Vehicle Service</Nav.Link>
                        <Nav.Link href="list/listPath">List Path</Nav.Link>
                        <Nav.Link href="list/listNodes">List Nodes</Nav.Link>
                        <Nav.Link href="list/listLines">List Lines</Nav.Link>
                        <Nav.Link href="list/listCS">List Crew Service</Nav.Link>
                    </Nav>
            </Navbar>
      </div>
    );
  }
}

export default ListTab;