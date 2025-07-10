import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const reasons = [
  "Damaged Item",
  "Wrong Product Delivered",
  "Not Satisfied",
  "Other",
];

const ReturnDialog = ({ open, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (reason) {
      onConfirm(reason);
      setReason("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Return Order</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          label="Reason for Return"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mt: 1 }}
        >
          {reasons.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          disabled={!reason}
          onClick={handleConfirm}
        >
          Confirm Return
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnDialog;
