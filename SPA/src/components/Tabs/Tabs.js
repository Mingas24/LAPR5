// // import React, { useContext } from 'react';
// // import Navbar from 'react-bootstrap/NavBar';
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import Nav from "react-bootstrap/Nav";
// // import '../../App.css';
// // import { UserContext } from '../UI/UserContext';

// // export default function Tabs() {

// //     const user = useContext(UserContext);
// //     console.log(user)
// //     const isUser = user && user.role === "true";
// //     const isAdmin = user && user.role === "false";
// //     console.log(isAdmin)
// //     return (
// //         <div>
// //             <Navbar expand="lg">
// //                 <Navbar.Brand href="/">Paredes Bus Network</Navbar.Brand>
// //                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
// //                 <Navbar.Collapse id="responsive-navbar-nav">
// //                     <Nav className="mr-auto" bg="light">
// //                         <Nav.Link href="/map">Map</Nav.Link>
// //                     </Nav>
// //                     <Nav>
// //                         <Nav.Link href="/login">Log In</Nav.Link>
// //                         <Nav.Link href="/register">Register</Nav.Link>
// //                     </Nav>
// //                     {isAdmin ? (
// //                         <div>
// //                             <Nav.Link href="/create">Create</Nav.Link>
// //                             <Nav.Link href="/list">List</Nav.Link>
// //                             <Nav.Link href="/import">Import</Nav.Link>
// //                             <Nav.Link href="/bestPath">Best Path</Nav.Link>
// //                             <Nav.Link href="/driverDuty">Driver Duty</Nav.Link>
// //                             <Nav>
// //                                 <Nav.Link href="/logout">Log Out</Nav.Link>
// //                             </Nav>
// //                         </div>
// //                     ) : isUser ? (
// //                         <div>
// //                             <Nav.Link href="/list">List</Nav.Link>
// //                             <Nav>
// //                                 <Nav.Link href="/logout">Log Out</Nav.Link>
// //                             </Nav>
// //                         </div>
// //                     ) : null
// //                     }
// //                 </Navbar.Collapse>
// //             </Navbar>
// //         </div>
// //     );
// // }

import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import '../../App.css';

export default function Tabs() {
    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand href="/">Paredes Bus Network</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <Nav className="mr-auto" bg="light">
                        <Nav.Link href="/map">Map</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                        <Nav.Link href="/list">List</Nav.Link>
                        <Nav.Link href="/import">Import</Nav.Link>
                        <Nav.Link href="/bestPath">Best Path</Nav.Link>
                        <Nav.Link href="/driverDuty">Driver Duty</Nav.Link>
                    </Nav> */}
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
