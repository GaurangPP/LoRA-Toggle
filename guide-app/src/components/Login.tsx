import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  dividerClasses,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import './Error.css';
import axios from 'axios';

const Login = () => {
  //Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Handles user login by sending a POST request to flask backend
  const handleLogin = async () => {
    //If user doesn't fill out fields
    if( email === "" || password === ""){
      setErrorMessage("Please fill out all fields");
      return;
    }

    console.log(email, password);

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password
      }, {
        withCredentials: true,
      });
      console.log(response.data.message);
      setErrorMessage("");
      window.location.href = "/";
    } catch (error: any) {
      setErrorMessage(error.response.data.error);
      console.log(error.response.data.error)
    }

  };


  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          {errorMessage !== "" ? <div className="error-message">{errorMessage}</div>:null}
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;

