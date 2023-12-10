import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // New state for Confirm Password field
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate if password and confirm password match
    if (values.password !== values.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return; // Stop further execution
    }

    // If passwords match, proceed with registration
    axios
      .post('http://localhost:8081/register', values)
      .then((res) => {
        if (res.status === 201 && res.data.Status === 'Success') {
          navigate('/login');
        } else {
          setError('Email already exists. Please use a different email.');
        }
      })
      .catch((err) => {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 500) {
            setError('Server error. Please try again later.');
          } else if (status === 409) {
            setError('Email already exists. Please use a different email.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '80vh' }}
        >
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                  Register
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={values.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={values.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {error && (
                        <Typography variant="body2" color="error" align="center">
                          {error}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
