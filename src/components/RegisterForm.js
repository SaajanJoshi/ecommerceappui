import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, makeStyles } from '@material-ui/core';
import {registerUser} from '../api/loginRegisterApi';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const RegisterForm = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleRegister = async() => {
    // Implement registration logic and call onRegister when successful
    // For simplicity, we are just logging in the console in this example
    const userData = {
      name,
      password,
      email,
      phone,
      zip,
      city,
      country,
      isAdmin: false
    };
    console.log('Registered:', userData);
    const status_code = await registerUser(userData);
    if (status_code === 200 ){
      navigate('/login');
    }
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <form className={classes.form}>
        <TextField
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="ZIP"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          className={classes.button}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterForm;
