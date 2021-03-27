import React, { useState } from 'react';
import {useHistory} from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getToken, setUserSession } from './Utils/Common';
import Alert from '@material-ui/lab/Alert';
// import browserHistory from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Student Management
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    // color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: 5,
    // marginLeft: -12,
  },
  errorAlert:{
    width:'100%'
  },
  
}));



 export default function SignIn() {


  const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
  const classes = useStyles();
  const routerHistory = useHistory();
  


  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const history = useHistory();
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post(
      'http://127.0.0.1:8000/api/auth/login', { email: email.value, password: password.value }).then(response => {
      setLoading(false);
      console.log(response);
      setUserSession(response.data.access_token, response.data.user);
      setTimeout(() => {
        routerHistory.push('/');
      
      }, 1000);
    
      // browserHistory.push('/')
    }).catch((error) => {
      console.log(error.data);
      // alert(error)
      setLoading(false);
      setError("Something went wrong. Please try again later.");
      // setError(error.data.message)
      // else setError("Something went wrong. Please try again later.");
    });
  }

  if(!getToken()){
    routerHistory.push('/login');
  }else{
    routerHistory.push('/');
  }

  return (
    
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && <Alert severity="error" className={classes.errorAlert}>{error}</Alert>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            // className={buttonClassname}
            disabled={loading}
            onClick={handleLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

}

