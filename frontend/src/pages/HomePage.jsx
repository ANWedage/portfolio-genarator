import React from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Button, Grid, Card, CardContent, Container, Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ShareIcon from "@mui/icons-material/Share";
import BoltIcon from "@mui/icons-material/Bolt";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const features = [
  { icon: <EditNoteIcon sx={{ fontSize: 28 }} />, title: "Step-by-Step Builder", desc: "Guided stepper form takes you through each section — personal info, skills, projects, and more." },
  { icon: <BoltIcon sx={{ fontSize: 28 }} />, title: "Instant Preview", desc: "See your portfolio live before publishing. What you enter is exactly what visitors will see." },
  { icon: <ShareIcon sx={{ fontSize: 28 }} />, title: "Unique Public URL", desc: "Get a shareable link like profilio.app/portfolio/your-name that anyone can visit." },
  { icon: <UpdateIcon sx={{ fontSize: 28 }} />, title: "Edit Anytime", desc: "Update skills, add new projects, or tweak your bio — changes reflect instantly." },
];

const steps = [
  { num: "01", label: "Fill the Form", desc: "Complete each section of the guided builder in minutes." },
  { num: "02", label: "Preview It", desc: "Review your portfolio before making it live." },
  { num: "03", label: "Publish & Share", desc: "Get your unique URL and share it with recruiters." },
];

const HomePage = () => (
  <Box>
    {/* Hero */}
    <Box sx={{
      background: "linear-gradient(150deg, #0d1b2a 0%, #023e8a 55%, #1a0050 100%)",
      color: "#fff", py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <Box sx={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.15) 0%, transparent 70%)", top: -100, right: -100, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,47,247,0.12) 0%, transparent 70%)", bottom: -100, left: -100, pointerEvents: "none" }} />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ maxWidth: 740 }}>
          <Chip label="Free & Open Source" icon={<BoltIcon />} sx={{ mb: 3, bgcolor: "rgba(0,180,216,0.15)", color: "#00b4d8", border: "1px solid rgba(0,180,216,0.3)", fontWeight: 600, "& .MuiChip-icon": { color: "#00b4d8" } }} />
          <Typography variant="h1" sx={{ fontSize: { xs: "2.6rem", md: "4rem" }, lineHeight: 1.1, fontWeight: 800, mb: 2.5 }}>
            Your Developer Portfolio,{" "}
            <Box component="span" sx={{ background: "linear-gradient(135deg, #00b4d8, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Built in Minutes
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.65)", fontWeight: 400, lineHeight: 1.9, mb: 4, maxWidth: 560 }}>
            ProFilio turns your experience into a stunning, shareable portfolio page — no design skills, no signup required.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="contained" color="primary" size="large" component={Link} to="/create" endIcon={<ArrowForwardIcon />}
              sx={{ fontSize: "1rem", py: 1.5, px: 3.5, background: "linear-gradient(135deg, #0077b6, #00b4d8)", boxShadow: "0 6px 25px rgba(0,180,216,0.45)" }}>
              Build My Portfolio
            </Button>
            <Button variant="outlined" size="large" href="#how-it-works"
              sx={{ fontSize: "1rem", py: 1.5, px: 3.5, color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.3)", "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.06)" } }}>
              See How It Works
            </Button>
          </Box>
          {/* URL preview pill */}
          <Box sx={{ mt: 4, display: "inline-block", bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, px: 2.5, py: 1, fontFamily: "monospace", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)" }}>
            profilio.app/portfolio/
            <Box component="span" sx={{ color: "#00b4d8", fontWeight: 700 }}>your-username</Box>
          </Box>
        </Box>
      </Container>
    </Box>

    {/* Features */}
    <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}>Features</Typography>
          <Typography variant="h3" fontWeight={700} sx={{ mt: 0.5 }}>
            Everything you need to{" "}
            <Box component="span" sx={{ background: "linear-gradient(135deg, #0077b6, #7b2ff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              stand out
            </Box>
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card elevation={0} sx={{ height: "100%", border: "1px solid rgba(0,119,182,0.1)", p: 1, transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 35px rgba(0,119,182,0.12)" } }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Box sx={{ width: 60, height: 60, borderRadius: 3, background: "linear-gradient(135deg, rgba(0,119,182,0.1), rgba(123,47,247,0.1))", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2, color: "primary.main" }}>
                    {f.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    {/* How It Works */}
    <Box id="how-it-works" sx={{ py: { xs: 8, md: 11 }, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>How It Works</Typography>
          <Typography variant="h3" fontWeight={700} sx={{ mt: 0.5 }}>Three simple steps</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {steps.map((s, i) => (
            <Box key={i} sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: "rgba(0,119,182,0.12)", lineHeight: 1, minWidth: 60 }}>{s.num}</Typography>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleIcon sx={{ color: "primary.main", fontSize: 20 }} /> {s.label}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.8 }}>{s.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>

    {/* CTA */}
    <Box sx={{ background: "linear-gradient(135deg, #0077b6, #7b2ff7)", py: { xs: 8, md: 10 }, textAlign: "center", color: "#fff" }}>
      <Container maxWidth="sm">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 1.5 }}>Ready to get hired?</Typography>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, color: "rgba(255,255,255,0.8)" }}>
          Build your portfolio in under 5 minutes — completely free.
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/create" endIcon={<ArrowForwardIcon />}
          sx={{ bgcolor: "#fff", color: "primary.dark", fontWeight: 700, fontSize: "1.05rem", py: 1.5, px: 4, "&:hover": { bgcolor: "rgba(255,255,255,0.9)" } }}>
          Start Building Now
        </Button>
      </Container>
    </Box>
  </Box>
);

export default HomePage;
