import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavLink from 'react-router-dom/NavLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup'

const Header = () => {

    const mystyle = {
        fontSize: '25px',
        fontWeight: 'bold',
        textDecoration: 'none'
    };

    return (
        <Navbar bg="light" expand="lg">
            <NavLink style={mystyle} to="/home">Academy</NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <Form inline >
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </InputGroup>
                </Form>
                <Nav>
                    <NavLink to="/login" href="/login">Login</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;