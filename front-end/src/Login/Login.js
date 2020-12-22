import React, { useState } from 'react';import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Username:', event.target.username.value);
        console.log('Password:', event.target.password.value);
    }

    return (
        <Container>
            <Row>
                <Col style={{ marginTop: '100px' }}>
                    <Card>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center', fontWeight: 'bold' }}><h2>LOGIN</h2></Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{fontWeight: 'bold'}}>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" name="username"/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{fontWeight: 'bold'}}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password"/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <p>Dont have account, Please <a href="/register">Register</a></p>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit" variant="primary">Submit</Button>{' '}
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;