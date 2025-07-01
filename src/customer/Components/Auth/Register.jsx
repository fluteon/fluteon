
// by Yotube

// import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, register } from "../../../Redux/Auth/Action";
// import { Fragment, useEffect, useState } from "react";

// export default function RegisterUserForm({ handleNext }) {
//   const navigate = useNavigate();
//   const dispatch=useDispatch();
//   const [openSnackBar,setOpenSnackBar]=useState(false);
//   const { auth } = useSelector((store) => store);
//   const handleClose=()=>setOpenSnackBar(false);

//   const jwt=localStorage.getItem("jwt");

// useEffect(()=>{
//   if(jwt){
//     dispatch(getUser(jwt))
//   }

// },[jwt])


//   useEffect(() => {
//     if (auth.user || auth.error) setOpenSnackBar(true)
//   }, [auth.user]);
  
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     const userData={
//       firstName: data.get("firstName"),
//       lastName: data.get("lastName"),
//       email: data.get("email"),
//       password: data.get("password"),
      
//     }
//     console.log("user data",userData);
//     dispatch(register(userData))
  
//   };

//   return (
//     <div className="">
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="firstName"
//               name="firstName"
//               label="First Name"
//               fullWidth
//               autoComplete="given-name"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               required
//               id="lastName"
//               name="lastName"
//               label="Last Name"
//               fullWidth
//               autoComplete="given-name"
//             />
//           </Grid>
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
//               Register
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

// <div className="flex justify-center flex-col items-center">
//      <div className="py-3 flex items-center ">
//         <p className="m-0 p-0">if you have already account ?</p>
//         <Button onClick={()=> navigate("/login")} className="ml-5" size="small">
//           Login
//         </Button>
//       </div>
// </div>

// <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           {auth.error?auth.error:auth.user?"Register Success":""}
//         </Alert>
//       </Snackbar>
     
//     </div>
//   );
// }



// By chatgpt

// import {
//   Grid,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, register } from "../../../Redux/Auth/Action";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function RegisterUserForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [openSnackBar, setOpenSnackBar] = useState(false);
//   const [step, setStep] = useState("phone");
//   const [mobile, setMobile] = useState("");
//   const { auth } = useSelector((store) => store);
//   const jwt = localStorage.getItem("jwt");

//   const handleClose = () => setOpenSnackBar(false);

//   useEffect(() => {
//     if (jwt) dispatch(getUser(jwt));
//   }, [jwt]);

//   useEffect(() => {
//     if (auth.user || auth.error) setOpenSnackBar(true);
//   }, [auth.user]);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const otpId = params.get("otp_id");

//     if (otpId) {
//       setStep("form");
//     }
//   }, [location.search]);

//   const handlePhoneSubmit = async (e) => {
//     e.preventDefault();
//     if (!/^[6-9]\d{9}$/.test(mobile)) {
//       return alert("Enter a valid 10-digit mobile number");
//     }

//     try {
//       const fullPhone = `+91${mobile}`;
//       const response = await axios.post("http://localhost:8000/auth/send-otp", {
//         phone: fullPhone,
//       });

//       const { otpLink } = response.data;
//       window.location.href = otpLink;
//     } catch (err) {
//       console.error("OTP send error:", err);
//     }
//   };

//   const handleRegisterSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     const userData = {
//       firstName: data.get("firstName"),
//       lastName: data.get("lastName"),
//       email: data.get("email"),
//       password: data.get("password"),
//       phone: `+91${mobile}`,
//     };

//     console.log("Registering:", userData);
//     dispatch(register(userData));
//   };

//   return (
//     <div>
//       {step === "phone" ? (
//         <form onSubmit={handlePhoneSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 id="mobile"
//                 name="mobile"
//                 label="Enter Mobile Number"
//                 fullWidth
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 InputProps={{
//                   startAdornment: <span style={{ marginRight: "6px" }}>+91</span>,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 className="bg-[#9155FD] w-full"
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 sx={{ padding: ".8rem 0" }}
//               >
//                 Send OTP
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       ) : (
//         <form onSubmit={handleRegisterSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Verified Phone Number"
//                 value={`+91${mobile}`}
//                 fullWidth
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField required id="firstName" name="firstName" label="First Name" fullWidth />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField required id="lastName" name="lastName" label="Last Name" fullWidth />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField required id="email" name="email" label="Email" fullWidth />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 id="password"
//                 name="password"
//                 label="Password"
//                 fullWidth
//                 type="password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 className="bg-[#9155FD] w-full"
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 sx={{ padding: ".8rem 0" }}
//               >
//                 Register
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       )}

//       <div className="flex justify-center flex-col items-center">
//         <div className="py-3 flex items-center">
//           <p className="m-0 p-0">Already have an account?</p>
//           <Button onClick={() => navigate("/login")} className="ml-5" size="small">
//             Login
//           </Button>
//         </div>
//       </div>

//       <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
//           {auth.error ? auth.error : auth.user ? "Register Success" : ""}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// email verification ke sath




import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RegisterUserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", ""]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [passwordError, setPasswordError] = useState("");


  const handleSnackbar = (msg) => {
    setSnackBarMessage(msg);
    setSnackBarOpen(true);
  };
  const handleCloseSnackbar = () => setSnackBarOpen(false);

const handleSendOtp = async () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.startsWith("a@")) {
    return handleSnackbar("Please enter a valid and acceptable email.");
  }

  try {
    setOtpLoading(true);
    const res = await axios.post("http://localhost:8000/auth/send-otp", { email });
    // console.log("res data....", res);
    handleSnackbar(res.data.message || "OTP sent successfully!");
    setOtpSent(true);
  } catch (err) {
    // console.error("❌ OTP Send Error:", err?.response || err); // <-- Log full error
    const errorMsg = err.response?.data?.error || err.response?.data?.message || "Failed to send OTP.";

    // Show special message if user already exists
    if (errorMsg.toLowerCase().includes("user already exists")) {
      handleSnackbar("User already registered. Please login.");
    } else {
      handleSnackbar(errorMsg);
    }
  } finally {
    setOtpLoading(false);
  }
};


const handleVerifyOtp = async () => {
  const enteredOtp = otpInputs.join("");
  if (enteredOtp.length !== 5) {
    return handleSnackbar("Please enter a valid 5-digit OTP.");
  }

  try {
    setVerifyingOtp(true);
    const res = await axios.post("http://localhost:8000/auth/verify-otp", {
      email,
      otp: enteredOtp,
    });

    // console.log("OTP VERIFY RESPONSE:", res.data); // 👈 Add this line

    if (res.data.success === true) {
      // console.log("✅ Setting Email Verified to true");
      setEmailVerified(true); // 👈 This should now work
      handleSnackbar("Email verified successfully!");
    } else {
      handleSnackbar(res.data.message || "OTP verification failed.");
    }
  } catch (err) {
    handleSnackbar(err.response?.data?.message || "OTP verification failed.");
  } finally {
    setVerifyingOtp(false);
  }
};

  useEffect(() => {
  // console.log("Email verification status updated:", emailVerified);
}, [emailVerified]);


  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpInputs];
      newOtp[index] = value;
      setOtpInputs(newOtp);

      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
    setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, number & special character.");
    return;
  } else {
    setPasswordError(""); // clear error if valid
  }
    dispatch(register({ ...formData, email }));
  };

  useEffect(() => {
    if (auth.user) handleSnackbar("Register Success");
    if (auth.error) handleSnackbar(auth.error);
  }, [auth.user, auth.error]);

// console.log("💥 Full State", {
//   emailVerified,
//   otpInputs,
//   otpSent,
//   email,
//   formData,
// });

  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => !emailVerified && setEmail(e.target.value)}
              disabled={emailVerified}
              required
              fullWidth
            />
          </Grid>

          {!otpSent && !emailVerified && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSendOtp}
                disabled={otpLoading}
              >
                {otpLoading ? <CircularProgress size={24} /> : "Send OTP"}
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
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp}
                >
                  {verifyingOtp ? <CircularProgress size={24} /> : "Verify OTP"}
                </Button>
              </Grid>
            </>
          )}

          {emailVerified && (
            <>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
          <TextField
  label="Password"
  type="password"
  value={formData.password}
  onChange={(e) => {
    setFormData({ ...formData, password: e.target.value });
    if (passwordError) setPasswordError(""); // Clear error on change
  }}
  error={!!passwordError}
  helperText={passwordError}
  fullWidth
  required
/>

              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Register
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>

      <Box display="flex" justifyContent="center" mt={2}>
        <span>If you already have an account?</span>
        <Button onClick={() => navigate("/login")} size="small">
          Login
        </Button>
      </Box>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
