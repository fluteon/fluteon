import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendUserQuery } from "../Redux/Customers/Query/Acion";

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector((state) => state.query);

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendUserQuery(form));
  };

  useEffect(() => {
    if (successMessage) {
      setOpen(true);
      setForm({ name: "", phone: "", message: "" });
    }
  }, [successMessage]);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-12 lg:px-24">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--call-logo-laptop-helping-customer-service-pack-network-communication-illustrations-2912020.png"
          alt="Customer service call"
          className="w-full max-w-sm rounded-lg shadow-md object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 max-w-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Get in Touch with <span className="text-pink-600">Fluteon</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Have questions about our collection or need styling advice? We’re here to help! Fill out the form below.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Your Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we assist you?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#ec4899",
              color: "white",
              fontWeight: "600",
              paddingY: "8px",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#db2777",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Send Message"}
          </Button>
        </form>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {error && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Contact;
