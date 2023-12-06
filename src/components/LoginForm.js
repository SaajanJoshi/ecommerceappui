import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, makeStyles } from '@material-ui/core';
import {loginUser} from '../api/loginRegisterApi'
import { useUser } from '../context/UserContext';
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

const LoginForm = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useUser();
  const navigate = useNavigate();

  
  const handleLogin = async() => {
    // Implement authentication logic and call onLogin when successful
    // For simplicity, we are just logging in the console in this example
    const {user, token, status_code} = await loginUser(username,password);
    login(user,token)

    if (status_code === 200 ){
      navigate('/');
    }
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form className={classes.form}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
