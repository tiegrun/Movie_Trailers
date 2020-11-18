import React, { useState } from 'react';
import axios from "axios";
import {Button, Form, Container, Row, Col, nav} from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
    };

  return (
    <Container>
      {/* <br></br>
      <br></br> */}
      <Form>
        <Form.Group className='login'>
          <Row className='row'>
            <Col>
              <Form.Label className='Label'>Username:</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Username'
              />
            </Col>
            <Col>
              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='Control2'
                type='password'
                placeholder='Enter Password'
              />
            </Col>
          </Row>
          <Row className='row text-center'>
            <Col className='Button'>
              <Button type='button' variant='info' size="lg" onClick={handleSubmit}>
                Log in
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
}