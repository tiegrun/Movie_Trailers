import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    //authentication
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      username: null,
    });

    
    window.open('/', '_self');
    // window.location.href='/' ;
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios
      .get(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  deleteUser(token){
    const username = localStorage.getItem('user');
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
  
    axios
    .delete(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday:  this.state.Birthday,
    })
    .then(() => {
      
      alert('Your account has been successfully deleted!');
      console.log(data);
      window.open('/', '_self');
    })
    .catch((e) => {
      console.log('It is impossible to delete');
    });
  }

  updateUser(token){
  const username = localStorage.getItem('user');

    axios
      .put('https://tiegrun-movie-trailers.herokuapp.com/users/${username}', {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday,
      })
      .then((response) => {
        const data = response.data;
        alert('Your account has been successfully updated!');
        console.log(data);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('It is impossible to update');
      });
  }

  render() {
    const { movies } = this.props;
   
    return (
        <div className="profile-view">
          <Card>
            <Card.Body>
            <Card.Title>My Profile</Card.Title>
              <Card.Text><span className="cardLabel">Username: </span>{this.state.Username}</Card.Text>
              <Card.Text><span className="cardLabel">Email: </span>{this.state.Email}</Card.Text>
              <Card.Text><span className="cardLabel">Birthday: </span>{this.state.Birthday}</Card.Text>
              <Card.Text><span className="cardLabel">Favorite Movies: </span>{this.state.FavoriteMovies}</Card.Text>
              <Card.Text>
                <Button variant="link" onClick={() => this.updateUser()}>Update Profile</Button>
                <Button variant="link" onClick={() => this.deleteUser()}>Delete User</Button>
                <Button variant="link" onClick={() => onLoggedOut()}>Log out</Button>
                <Link to={'/'}>
                  <Button variant="link">Home Page</Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
    );
  }
}