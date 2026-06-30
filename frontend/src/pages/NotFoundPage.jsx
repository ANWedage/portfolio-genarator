import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const NotFoundPage = () => (
  <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", p: 3, bgcolor: "background.default" }}>
    <Typography variant="h1" sx={{ fontSize: { xs: "6rem", md: "9rem" }, fontWeight: 800, background: "linear-gradient(135deg, #0077b6, #7b2ff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
      404
    </Typography>
    <Typography variant="h4" fontWeight={700} sx={{ mt: 2, mb: 1 }}>Page Not Found</Typography>
    <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 360 }}>
      The page you are looking for does not exist or has been moved.
    </Typography>
    <Button variant="contained" color="primary" component={Link} to="/" startIcon={<HomeIcon />} size="large">
      Back to Home
    </Button>
  </Box>
);

export default NotFoundPage;
