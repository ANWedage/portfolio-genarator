import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Button, Fab, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import PortfolioView from "../components/portfolio/PortfolioView";
import Spinner from "../components/common/Spinner";
import { portfolioAPI } from "../utils/api";
import { Typography } from "@mui/material";

const PublicPortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await portfolioAPI.getByUsername(username);
        setPortfolio(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Portfolio not found");
      } finally { setLoading(false); }
    };
    fetch();
  }, [username]);

  if (loading) return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default" }}>
      <Spinner message="Loading portfolio…" />
    </Box>
  );

  if (error) return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, p: 3, bgcolor: "background.default" }}>
      <Typography variant="h3" fontWeight={800}>404</Typography>
      <Typography variant="h5" fontWeight={700}>Portfolio Not Found</Typography>
      <Typography color="text.secondary">No portfolio found for <strong>@{username}</strong></Typography>
      <Button variant="contained" component={Link} to="/" startIcon={<HomeIcon />} sx={{ mt: 1 }}>Go Home</Button>
    </Box>
  );

  return (
    <Box>
      <PortfolioView data={portfolio} />
      <Tooltip title="Edit this portfolio">
        <Fab color="primary" size="medium" component={Link} to={`/edit/${username}`}
          sx={{ position: "fixed", bottom: 32, right: 32, background: "linear-gradient(135deg, #0077b6, #00b4d8)", boxShadow: "0 6px 20px rgba(0,119,182,0.4)" }}>
          <EditIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default PublicPortfolioPage;
