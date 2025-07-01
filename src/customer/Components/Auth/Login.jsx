// import * as React from "react";
// import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, login } from "../../../Redux/Auth/Action";
// import { useEffect } from "react";
// import { useState } from "react";

// export default function LoginUserForm({ handleNext }) {
//   const navigate = useNavigate();
//   const dispatch=useDispatch();
//   const jwt=localStorage.getItem("jwt");
//   const [openSnackBar,setOpenSnackBar]=useState(false);
//   const { auth } = useSelector((store) => store);
//   const handleCloseSnakbar=()=>setOpenSnackBar(false);
//   useEffect(()=>{
//     if(jwt){
//       dispatch(getUser(jwt))
//     }
  
//   },[jwt])
  
  
//     useEffect(() => {
//       if (auth.user || auth.error) setOpenSnackBar(true)
//     }, [auth.user]);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
    
//     const userData={
//       email: data.get("email"),
//       password: data.get("password"),
     
//     }
//     console.log("login user",userData);
  
//     dispatch(login(userData));

//   };

//   return (
//     <React.Fragment className=" shadow-lg ">
//       <form className="w-full" onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="given-name"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="given-name"
//               type="password"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{padding:".8rem 0"}}
//             >
//               Login
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <div className="flex justify-center flex-col items-center">
//          <div className="py-3 flex items-center">
//         <p className="m-0 p-0">don't have account ?</p>
//         <Button onClick={()=> navigate("/register")} className="ml-5" size="small">
//           Register
//         </Button>
//         </div>
//       </div>
//       <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnakbar}>
//         <Alert onClose={handleCloseSnakbar} severity="success" sx={{ width: '100%' }}>
//           {auth.error?auth.error:auth.user?"Register Success":""}
//         </Alert>
//       </Snackbar>
//     </React.Fragment>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import axios from "axios";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { auth } = useSelector((store) => store);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [forgotFlow, setForgotFlow] = useState(false);

  const [email, setEmail] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", ""]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const showSnackbar = (msg) => {
    setSnackBarMessage(msg);
    setOpenSnackBar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackBar(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  // useEffect(() => {
  //   if (auth.user || auth.error) {
  //     showSnackbar(auth.error ? auth.error : "Login Success");
  //   }
  // }, [auth.user, auth.error]);
  
useEffect(() => {
  if (auth.user || auth.error) {
    if (auth.error?.toLowerCase().includes("invalid")) {
      showSnackbar("You entered the wrong password.");
    } else {
      showSnackbar(auth.error || "Login Success");
    }
  }
}, [auth.user, auth.error]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/auth/send-reset-otp", { email });
      showSnackbar(res.data.message);
      setOtpSent(true);
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otpInputs];
      updated[index] = value;
      setOtpInputs(updated);
      if (value && index < 4) document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpInputs.join("");
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/auth/verify-otp", { email, otp });
      if (res.data.success) {
        showSnackbar("OTP verified");
        setEmailVerified(true);
      }
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:8000/auth/reset-password", {
        email,
        newPassword,
      });
      showSnackbar(res.data.message || "Password reset");
      setForgotFlow(false);
      setEmailVerified(false);
      setOtpSent(false);
      setOtpInputs(["", "", "", "", ""]);
      setNewPassword("");
    } catch (err) {
      showSnackbar(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <React.Fragment>
      {!forgotFlow ? (
        <form className="w-full" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className="bg-[#9155FD] w-full"
                type="submit"
                variant="contained"
                size="large"
                sx={{ padding: ".8rem 0" }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="small" onClick={() => setForgotFlow(true)}>
                Forgot Password?
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label="Registered Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          {!otpSent && (
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleSendOtp} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
              </Button>
            </Grid>
          )}

          {otpSent && !emailVerified && (
            <>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={1}>
                  {otpInputs.map((digit, i) => (
                    <TextField
                      key={i}
                      id={`otp-${i}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center" },
                      }}
                      sx={{ width: "50px" }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={handleVerifyOtp} disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
                </Button>
              </Grid>
            </>
          )}

          {emailVerified && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={handleResetPassword}>
                  Set New Password
                </Button>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Button size="small" onClick={() => setForgotFlow(false)}>
              Back to Login
            </Button>
          </Grid>
        </Grid>
      )}

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p className="m-0 p-0">Don't have an account?</p>
          <Button onClick={() => navigate("/register")} className="ml-5" size="small">
            Register
          </Button>
        </div>
      </div>

      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
