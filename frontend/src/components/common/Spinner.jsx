import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Spinner = ({ size = 48, message = "Loading..." }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 6, gap: 2 }}>
    <CircularProgress size={size} thickness={3} />
    {message && <Typography variant="body2" color="text.secondary">{message}</Typography>}
  </Box>
);

export default Spinner;
