import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function OtpSuccess() {
  const location = useLocation();
  const [otpId, setOtpId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("otp_id");
    setOtpId(id);

    // Optional: You can now send this otp_id to your backend to verify user registration
    // fetch(`/api/verify-otp?otp_id=${id}`) ...
  }, [location]);

  return (
    <div style={{ padding: 40 }}>
      <h1>✅ OTP Verified Successfully!</h1>
      <p>OTP ID: <strong>{otpId}</strong></p>
      <p>You are now verified. You can continue to login/register.</p>
    </div>
  );
}

export default OtpSuccess;
