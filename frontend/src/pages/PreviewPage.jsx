import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Typography, Chip, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PortfolioView from "../components/portfolio/PortfolioView";
import { portfolioAPI } from "../utils/api";
import toast from "react-hot-toast";

const PreviewPage = () => {
  const [data, setData] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const draft = sessionStorage.getItem("portfolioDraft");
    if (!draft) { navigate("/create"); return; }
    setData(JSON.parse(draft));
  }, [navigate]);

  const handlePublish = async () => {
    if (!data) return;
    setPublishing(true);
    try {
      await portfolioAPI.create({ ...data, isPublished: true });
      sessionStorage.removeItem("portfolioDraft");
      toast.success("Portfolio published successfully!");
      navigate(`/portfolio/${data.username}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish. Please try again.");
    } finally { setPublishing(false); }
  };

  if (!data) return null;

  return (
    <Box>
      {/* Preview Banner */}
      <Paper elevation={2} sx={{ position: "sticky", top: 64, zIndex: 50, borderRadius: 0, py: 1.5, px: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5, bgcolor: "#fff", borderBottom: "1px solid rgba(0,119,182,0.12)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip label="PREVIEW MODE" size="small" sx={{ bgcolor: "rgba(245,158,11,0.12)", color: "#b45309", fontWeight: 700, border: "1px solid rgba(245,158,11,0.3)" }} />
          <Typography variant="body2" color="text.secondary">This is exactly how visitors will see your portfolio</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button variant="outlined" size="small" component={Link} to="/create" startIcon={<ArrowBackIcon />}>Edit</Button>
          <Button variant="contained" size="small" onClick={handlePublish} disabled={publishing} startIcon={<PublishIcon />}
            sx={{ background: "linear-gradient(135deg, #0077b6, #00b4d8)" }}>
            {publishing ? "Publishing…" : "Publish Portfolio"}
          </Button>
        </Box>
      </Paper>
      <PortfolioView data={data} isPreview={true} />
    </Box>
  );
};

export default PreviewPage;
