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
            <Navbar color="light" light fixed="true" expand="lg">
                <NavbarBrand tag={RRNavLink} to="/">
                    Amplify Nash
                </NavbarBrand>

                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/venues">
                                        Venues
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
