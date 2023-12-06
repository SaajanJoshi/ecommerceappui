import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, makeStyles } from '@material-ui/core';

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

const RegisterForm = ({ onRegister }) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Implement registration logic and call onRegister when successful
    // For simplicity, we are just logging in the console in this example
    console.log('Registered:', username);
    onRegister(username);
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
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
