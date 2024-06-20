import React from "react";
import Navbar from 'react-bootstrap/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
//import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import '../../App.css';

class ImportTab extends React.Component {
  render() {
    return (
      <div>
        <Navbar expand="lg">
                    <Nav className="mr-auto" bg="light">    
                        <Nav.Link href="/admin/import/importMDR">Import MDR</Nav.Link>
                        <Nav.Link href="/admin/import/importMDV">Import MDV</Nav.Link>
                    </Nav>
            </Navbar>
      </div>
    );
  }
}

export default ImportTab;
