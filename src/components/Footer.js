import React, { useEffect } from "react";
import { Snackbar } from "@mui/material";

const Footer = ({ message, type, onClear }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClear();
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  return (
    <Snackbar
      open={!!message}
      message={message}
      autoHideDuration={2000}
      onClose={onClear}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      ContentProps={{
        sx: {
          backgroundColor: type === "success" ? "green" : "red",
          color: "white",
        },
      }}
    />
  );
};

export default Footer;
