import React, { useState } from "react";

function SendOtpPage() {
  const [phone, setPhone] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (data.otpLink) {
        window.location.href = data.otpLink; // 🔁 Redirect to OTP verification page
      } else {
        alert("Failed to get OTP link.");
        console.error("No otpLink:", data);
      }
    } catch (err) {
      console.error("❌ Error sending OTP:", err);
      alert("Error sending OTP");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>📲 Enter Your Phone Number</h2>
      <input
        type="text"
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
}

export default SendOtpPage;
