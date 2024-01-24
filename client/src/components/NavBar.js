import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Button,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";


export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);

    return (
        <div>
            <Navbar fixed="true" expand="lg" className="bg-black text-white">
                <NavbarBrand tag={RRNavLink} className="text-white" to="/">
                    Amplify Nash
                </NavbarBrand>

                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink tag={RRNavLink} className="text-white" to="/venues">
                                        Venue Info
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} className="text-white" to="/newconcert">
                                        Book Concert
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} className="text-white" to="/bands">
                                        Band Roster
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} className="text-white" to="/addband">
                                        Add Band
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Button
                                color="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout().then(() => {
                                        setLoggedInUser(null);
                                        setOpen(false);
                                    });
                                }}
                            >
                                Logout
                            </Button>
                        </Collapse>
                    </>
                ) : (
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    );
}
