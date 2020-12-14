import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import axios from "axios";
import { Link } from 'react-router-dom';
import {Button, Form, Container, Row, Col, nav} from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://tiegrun-movie-trailers.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        alert('Your account has been successfully created.! Please login');
        console.log(data);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(data , 'error registering the user');
      });
  };

  return (
    <Container className="regContainer">
      <Form>
        <Form.Group controlId="regUser">
          <Form.Label className='Label'>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => createUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="regPass">
          <Form.Label className='Label'>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => createPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="regEmail">
          <Form.Label className='Label'>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => createEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="regBday">
          <Form.Label className='Label'>Birthday</Form.Label>
          <Form.Control type="date" value={birthday} onChange={(e) => createBday(e.target.value)}
          />
        </Form.Group>
        <Button className="button-main" variant='info' type="submit" onClick={handleSubmit}>
          Register
        </Button>
        <Link to={`/`}>
          <Button variant="link">Back</Button>
        </Link>
      </Form>
    </Container>
  );
}