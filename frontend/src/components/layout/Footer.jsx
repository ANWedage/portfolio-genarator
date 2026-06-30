import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Divider, IconButton, Tooltip } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => (
  <Box component="footer" sx={{ background: "#0d1b2a", color: "#fff", pt: 5, pb: 3, mt: "auto" }}>
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 3, mb: 4 }}>
        {/* Brand */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <WorkspacePremiumIcon sx={{ color: "#00b4d8" }} />
            <Typography variant="h6" sx={{ fontWeight: 800, background: "linear-gradient(135deg, #00b4d8, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ProFilio
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 260, lineHeight: 1.8 }}>
            Craft a stunning developer portfolio in minutes — no design skills required.
          </Typography>
        </Box>
        {/* Links */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: "rgba(255,255,255,0.8)" }}>Quick Links</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[{ to: "/", label: "Home" }, { to: "/create", label: "Build Portfolio" }].map(l => (
              <Typography key={l.to} component={Link} to={l.to} variant="body2"
                sx={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", "&:hover": { color: "#00b4d8" }, transition: "color 0.2s" }}>
                {l.label}
              </Typography>
            ))}
          </Box>
        </Box>
        {/* Social */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: "rgba(255,255,255,0.8)" }}>Connect</Typography>
          <Tooltip title="GitHub">
            <IconButton href="https://github.com" target="_blank" sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#00b4d8" }, p: 0 }}>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", display: "block", textAlign: "center" }}>
        © {new Date().getFullYear()} ProFilio — Built with MERN Stack & Material UI
      </Typography>
    </Box>
  </Box>
);

export default Footer;
