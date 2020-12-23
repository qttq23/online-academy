import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavLink from 'react-router-dom/NavLink'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup'
import './style.css'

const Header = () => {

    const mystyle = {
        fontSize: '25px',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'white'
    };

    return (
        <Navbar expand="lg" className="header">
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
                    <Button variant="light">
                        <NavLink to="/login" href="/login" style={{color: "#005580", textDecoration: 'none', fontWeight: "bold"}}>Login</NavLink>
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;