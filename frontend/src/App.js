import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import CreatePortfolioPage from "./pages/CreatePortfolioPage";
import PreviewPage from "./pages/PreviewPage";
import PublicPortfolioPage from "./pages/PublicPortfolioPage";
import EditPortfolioPage from "./pages/EditPortfolioPage";
import NotFoundPage from "./pages/NotFoundPage";

const theme = createTheme({
  palette: {
    primary: { main: "#0077b6", light: "#00b4d8", dark: "#023e8a" },
    secondary: { main: "#7b2ff7", light: "#a855f7", dark: "#5b21b6" },
    background: { default: "#f0f4ff", paper: "#ffffff" },
    text: { primary: "#0d1b2a", secondary: "#4a5568" },
  },
  typography: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: "10px 24px", fontSize: "0.95rem" },
        containedPrimary: {
          background: "linear-gradient(135deg, #0077b6, #00b4d8)",
          boxShadow: "0 4px 15px rgba(0,119,182,0.35)",
          "&:hover": { boxShadow: "0 6px 20px rgba(0,119,182,0.5)", transform: "translateY(-1px)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true, size: "medium" },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: "'Poppins', sans-serif", borderRadius: 10, background: "#fff", color: "#0d1b2a", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" },
            success: { iconTheme: { primary: "#0077b6", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <Routes>
          <Route path="/portfolio/:username" element={<PublicPortfolioPage />} />
          <Route
            path="/*"
            element={
              <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Navbar />
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePortfolioPage />} />
                    <Route path="/preview" element={<PreviewPage />} />
                    <Route path="/edit/:username" element={<EditPortfolioPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
