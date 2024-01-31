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
            <Navbar fixed="true" expand="lg" className="bg-gradient-to-br from-neutral-950 to-neutral-800 text-white border-b-[.1em] h-[13rem] border-gray-500">
                <NavbarBrand tag={RRNavLink} className="text-white" to="/">
                    <img src="./logoo.png" alt="Amplify Nash Logo" className=" ml-20 mr-20 mt-0 h-[17rem]" />

                </NavbarBrand>

                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>
                        <Nav className="mr-auto flex items-center">
    <NavItem>
        <NavLink tag={RRNavLink} className="text-white hover:underline text-xl" to="/venues">
            Venue Info
        </NavLink>
    </NavItem>
    <NavItem>
        <span className="text-white mx-2 text-xl">|</span>
    </NavItem>
    <NavItem>
        <NavLink tag={RRNavLink} className="text-white hover:underline" to="/newconcert">
            Book Concert
        </NavLink>
    </NavItem>
    <NavItem>
        <span className="text-white mx-2 text-xl">|</span>
    </NavItem>
    <NavItem>
        <NavLink tag={RRNavLink} className="text-white hover:underline" to="/bands">
            Band Roster
        </NavLink>
    </NavItem>
    <NavItem>
        <span className="text-white mx-2 text-xl">|</span>
    </NavItem>
    <NavItem>
        <NavLink tag={RRNavLink} className="text-white hover:underline" to="/addband">
            Add Band
        </NavLink>
    </NavItem>
  
</Nav>

                            <NavLink
                                to="/logout"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout().then(() => {
                                        setLoggedInUser(null);
                                        setOpen(false);
                                    });
                                }}
                                className="text-white font-bold py-2 px-3 rounded inline-block mt-3 mr-4 cursor-pointer hover:underline" // Adjust padding, text size, and margin
                            >
                                Logout
                            </NavLink>
                        </Collapse>
                    </>
                ) : (
                    <Nav className="ml-auto " navbar>
                        {/* <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem> */}
                    </Nav>
                )}
            </Navbar>
        </div>
    );
}
