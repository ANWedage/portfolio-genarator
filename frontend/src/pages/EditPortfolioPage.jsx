import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Container, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PortfolioForm from "../components/form/PortfolioForm";
import Spinner from "../components/common/Spinner";
import { portfolioAPI } from "../utils/api";
import toast from "react-hot-toast";

const EditPortfolioPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await portfolioAPI.getByUsername(username);
        setPortfolio(res.data.data);
      } catch {
        toast.error("Portfolio not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [username, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await portfolioAPI.update(username, formData);
      toast.success("Portfolio updated successfully!");
      navigate(`/portfolio/${username}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update portfolio";
      toast.error(msg);
      throw err;
    }
  };

  if (loading) return <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spinner /></Box>;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="md">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
          <MuiLink component={Link} to="/" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 0.5 }} color="text.secondary">
            <HomeIcon sx={{ fontSize: 16 }} /> Home
          </MuiLink>
          <Typography color="text.secondary">@{username}</Typography>
          <Typography color="primary" fontWeight={600}>Edit</Typography>
        </Breadcrumbs>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 0.5 }}>Edit Portfolio</Typography>
          <Typography variant="body1" color="text.secondary">
            Updating <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>@{username}</Box>
          </Typography>
        </Box>
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, border: "1px solid rgba(0,119,182,0.1)" }}>
          {portfolio && <PortfolioForm onSubmit={handleSubmit} initialData={portfolio} submitLabel="Save Changes" />}
        </Paper>
      </Container>
    </Box>
  );
};

export default EditPortfolioPage;
