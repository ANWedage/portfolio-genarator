import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer,
  List, ListItem, ListItemText, useMediaQuery, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const links = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Build Portfolio" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,119,182,0.12)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", flexGrow: 1 }}>
            <WorkspacePremiumIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, background: "linear-gradient(135deg, #0077b6, #7b2ff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.5px" }}>
              ProFilio
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {links.map((l) => (
                <Button
                  key={l.to}
                  component={Link}
                  to={l.to}
                  sx={{ color: location.pathname === l.to ? "primary.main" : "text.secondary", fontWeight: location.pathname === l.to ? 700 : 500 }}
                >
                  {l.label}
                </Button>
              ))}
              <Button variant="contained" color="primary" component={Link} to="/create" sx={{ ml: 1 }}>
                Get Started
              </Button>
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, p: 2 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <List>
          {links.map((l) => (
            <ListItem key={l.to} component={Link} to={l.to} onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5, color: location.pathname === l.to ? "primary.main" : "text.primary", textDecoration: "none", fontWeight: location.pathname === l.to ? 700 : 400 }}
            >
              <ListItemText primary={l.label} />
            </ListItem>
          ))}
          <ListItem sx={{ mt: 1 }}>
            <Button variant="contained" color="primary" fullWidth component={Link} to="/create" onClick={() => setDrawerOpen(false)}>
              Get Started
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
