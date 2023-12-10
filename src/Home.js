import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Grid,
} from '@mui/material';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => {
        console.log(res);
        
        if (res.data.Status === 'SUCCESS') {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">ACCREDIAN</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
          {auth ? (
            <Grid item container direction="column" alignItems="center">
              <Typography variant="h4">You are authorized, {name}</Typography>
              <Button variant="contained" color="primary" onClick={handleDelete} style={{ marginTop: '20px' }}>
                Logout
              </Button>
            </Grid>
          ) : (
            <Grid item container direction="column" alignItems="center">
              <Typography variant="h4">YOU ARE NOT LOGGED IN, PLEASE LOGIN...</Typography>
              <Button component={Link} to="/login" variant="contained" color="primary" size="large" style={{ marginTop: '20px' }}>
                Login
              </Button>
            </Grid>
          )}
          <Grid item style={{ marginLeft: '320px', marginRight: '0px',marginBottom: '40px' }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSJunOheGnieRvikk1d-_niTBHzjELwyk5CSILtMNmA0PQFlmgvNzws-U8jDeXwVlJPQ&usqp=CAU:\Users\kavit\OneDrive\Desktop\ReactMySql\frontend\images\backg.jpg" alt="Your Image" style={{ maxHeight: '300px', maxWidth: '3000px' }} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
