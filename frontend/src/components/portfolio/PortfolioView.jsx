import React from "react";
import {
  Box, Typography, Chip, Avatar, Card, CardContent, CardActions,
  Button, Divider, Grid, Paper, Tooltip, IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import LaunchIcon from "@mui/icons-material/Launch";
import CodeIcon from "@mui/icons-material/Code";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SchoolIcon from "@mui/icons-material/School";

const SectionHeader = ({ icon, title }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
    <Box sx={{ width: 40, height: 40, borderRadius: 2, background: "linear-gradient(135deg, #0077b6, #7b2ff7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
      {icon}
    </Box>
    <Typography variant="h5" fontWeight={700}>{title}</Typography>
  </Box>
);

const PortfolioView = ({ data, isPreview = false }) => {
  const { fullName, title, bio, profileImage, contact, skills, projects, experience, views } = data;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section – sidebar layout */}
      <Box sx={{ background: "linear-gradient(150deg, #0d1b2a 0%, #023e8a 50%, #1a0050 100%)", color: "#fff", py: { xs: 6, md: 8 } }}>
        <Box sx={{ maxWidth: 1100, mx: "auto", px: 3 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left – Info */}
            <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>
              <Typography variant="overline" sx={{ color: "#00b4d8", fontWeight: 700, letterSpacing: 2 }}>
                Portfolio
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1, mt: 0.5, mb: 1, fontSize: { xs: "2.2rem", md: "3rem" } }}>
                {fullName || "Your Name"}
              </Typography>
              <Typography variant="h6" sx={{ color: "#a855f7", fontWeight: 600, mb: 2 }}>
                {title || "Developer"}
              </Typography>
              {bio && (
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, mb: 3, maxWidth: 520 }}>
                  {bio}
                </Typography>
              )}
              {/* Contact row */}
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {contact?.email && (
                  <Tooltip title={contact.email}>
                    <IconButton href={`mailto:${contact.email}`} sx={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, "&:hover": { background: "rgba(255,255,255,0.1)" } }}>
                      <EmailIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {contact?.github && (
                  <Tooltip title="GitHub">
                    <IconButton href={contact.github} target="_blank" rel="noreferrer" sx={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, "&:hover": { background: "rgba(255,255,255,0.1)" } }}>
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {contact?.linkedin && (
                  <Tooltip title="LinkedIn">
                    <IconButton href={contact.linkedin} target="_blank" rel="noreferrer" sx={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, "&:hover": { background: "rgba(255,255,255,0.1)" } }}>
                      <LinkedInIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {contact?.website && (
                  <Tooltip title="Website">
                    <IconButton href={contact.website} target="_blank" rel="noreferrer" sx={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, "&:hover": { background: "rgba(255,255,255,0.1)" } }}>
                      <LanguageIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              {views > 0 && !isPreview && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 2 }}>
                  <VisibilityIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>{views} profile views</Typography>
                </Box>
              )}
            </Grid>
            {/* Right – Avatar */}
            <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              {profileImage ? (
                <Box sx={{ position: "relative" }}>
                  <Box sx={{ width: { xs: 120, md: 200 }, height: { xs: 120, md: 200 }, borderRadius: "50%", background: "linear-gradient(135deg, #0077b6, #7b2ff7)", p: "4px" }}>
                    <Avatar src={profileImage} sx={{ width: "100%", height: "100%", border: "4px solid #0d1b2a" }}
                      onError={e => { e.target.style.display = "none"; }} />
                  </Box>
                  <Box sx={{ position: "absolute", bottom: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: "#10b981", border: "2px solid #0d1b2a" }} />
                </Box>
              ) : (
                <Avatar sx={{ width: { xs: 100, md: 180 }, height: { xs: 100, md: 180 }, fontSize: { xs: 40, md: 64 }, background: "linear-gradient(135deg, #0077b6, #7b2ff7)" }}>
                  {(fullName || "U")[0].toUpperCase()}
                </Avatar>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ maxWidth: 1100, mx: "auto", px: 3, py: 6 }}>
        {/* Skills */}
        {skills?.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <SectionHeader icon={<CodeIcon />} title="Technical Skills" />
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, background: "#fff", border: "1px solid rgba(0,119,182,0.1)" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
                {skills.map((skill, i) => (
                  <Chip key={i} label={skill} color="primary" variant="outlined"
                    sx={{ fontWeight: 600, fontSize: "0.9rem", px: 0.5, borderColor: "primary.light", "&:hover": { background: "rgba(0,119,182,0.08)" } }} />
                ))}
              </Box>
            </Paper>
          </Box>
        )}

        {/* Projects */}
        {projects?.filter(p => p.name).length > 0 && (
          <Box sx={{ mb: 6 }}>
            <SectionHeader icon={<BusinessCenterIcon />} title="Projects" />
            <Grid container spacing={3}>
              {projects.filter(p => p.name).map((project, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card elevation={2} sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 30px rgba(0,119,182,0.18)" } }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(135deg, #0077b6, #7b2ff7)", flexShrink: 0 }} />
                        <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>{project.name}</Typography>
                      </Box>
                      {project.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>{project.description}</Typography>
                      )}
                      {project.techStack?.length > 0 && (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                          {project.techStack.map((tech, j) => (
                            <Chip key={j} label={tech} size="small" sx={{ fontSize: "0.72rem", bgcolor: "rgba(0,119,182,0.08)", color: "primary.dark", fontWeight: 500 }} />
                          ))}
                        </Box>
                      )}
                    </CardContent>
                    {(project.githubLink || project.liveDemo) && (
                      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                        {project.githubLink && (
                          <Button size="small" variant="outlined" href={project.githubLink} target="_blank" rel="noreferrer"
                            startIcon={<GitHubIcon />} sx={{ borderRadius: 2, flex: 1, fontSize: "0.8rem" }}>
                            Code
                          </Button>
                        )}
                        {project.liveDemo && (
                          <Button size="small" variant="contained" href={project.liveDemo} target="_blank" rel="noreferrer"
                            startIcon={<LaunchIcon />} sx={{ borderRadius: 2, flex: 1, fontSize: "0.8rem" }}>
                            Demo
                          </Button>
                        )}
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Experience */}
        {experience?.filter(e => e.company).length > 0 && (
          <Box sx={{ mb: 6 }}>
            <SectionHeader icon={<SchoolIcon />} title="Work Experience" />
            <Box sx={{ position: "relative" }}>
              {/* Timeline line */}
              <Box sx={{ position: "absolute", left: 19, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, #0077b6, #7b2ff7)", borderRadius: 1 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {experience.filter(e => e.company).map((exp, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 3, mb: 3, position: "relative" }}>
                    {/* Timeline dot */}
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #0077b6, #7b2ff7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0, zIndex: 1, mt: 0.5, boxShadow: "0 0 0 4px #f0f4ff" }}>
                      <BusinessCenterIcon sx={{ fontSize: 18 }} />
                    </Box>
                    {/* Content */}
                    <Paper elevation={0} sx={{ flex: 1, p: 2.5, borderRadius: 3, background: "#fff", border: "1px solid rgba(0,119,182,0.1)" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1, mb: 0.5 }}>
                        <Box>
                          <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>{exp.role}</Typography>
                          <Typography variant="body2" color="primary.main" fontWeight={600}>{exp.company}</Typography>
                        </Box>
                        {exp.duration && (
                          <Chip label={exp.duration} size="small" sx={{ bgcolor: "rgba(123,47,247,0.08)", color: "secondary.dark", fontWeight: 600, fontSize: "0.78rem" }} />
                        )}
                      </Box>
                      {exp.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mt: 1 }}>{exp.description}</Typography>
                      )}
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* Get In Touch */}
        {contact && Object.values(contact).some(v => v) && (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Divider sx={{ mb: 5 }} />
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Get In Touch</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Open to new opportunities and collaborations
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              {contact.email && (
                <Button variant="contained" href={`mailto:${contact.email}`} startIcon={<EmailIcon />} size="large">
                  Send Email
                </Button>
              )}
              {contact.linkedin && (
                <Button variant="outlined" href={contact.linkedin} target="_blank" rel="noreferrer" startIcon={<LinkedInIcon />} size="large">
                  LinkedIn
                </Button>
              )}
              {contact.github && (
                <Button variant="outlined" href={contact.github} target="_blank" rel="noreferrer" startIcon={<GitHubIcon />} size="large">
                  GitHub
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PortfolioView;
