import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Container, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PortfolioForm from "../components/form/PortfolioForm";
import toast from "react-hot-toast";

const CreatePortfolioPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    sessionStorage.setItem("portfolioDraft", JSON.stringify(formData));
    toast.success("Looking great! Check your preview.");
    navigate("/preview");
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
          <MuiLink component={Link} to="/" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 0.5 }} color="text.secondary">
            <HomeIcon sx={{ fontSize: 16 }} /> Home
          </MuiLink>
          <Typography color="primary" fontWeight={600}>Create Portfolio</Typography>
        </Breadcrumbs>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 0.5 }}>Build Your Portfolio</Typography>
          <Typography variant="body1" color="text.secondary">
            Complete each section of the guided builder — your info stays private until you publish.
          </Typography>
        </Box>
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, border: "1px solid rgba(0,119,182,0.1)" }}>
          <PortfolioForm onSubmit={handleSubmit} submitLabel="Preview My Portfolio" />
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatePortfolioPage;
