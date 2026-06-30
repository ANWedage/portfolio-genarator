import React, { useState, useEffect } from "react";
import {
  Box, Stepper, Step, StepLabel, StepContent, TextField, Button,
  Typography, Chip, IconButton, Card, CardContent, Alert,
  InputAdornment, Tooltip, Avatar, Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  DeleteForeverOutlined as DeleteOutlineIcon,
  PersonOutlined as PersonOutlineIcon,
  ContactMail as ContactMailOutlinedIcon,
  Code as CodeIcon,
  RocketLaunch as RocketLaunchOutlinedIcon,
  WorkOutlined as WorkOutlineIcon,
  CheckCircle as CheckCircleOutlineIcon,
} from "@mui/icons-material";
import { portfolioAPI } from "../../utils/api";
import { validatePortfolioForm } from "../../utils/validation";
import toast from "react-hot-toast";

const EMPTY_PROJECT = { name: "", description: "", techStack: [], githubLink: "", liveDemo: "" };
const EMPTY_EXPERIENCE = { company: "", role: "", duration: "", description: "" };
const INITIAL_DATA = {
  username: "", fullName: "", title: "", bio: "", profileImage: "",
  contact: { email: "", linkedin: "", github: "", website: "" },
  skills: [], projects: [{ ...EMPTY_PROJECT }], experience: [{ ...EMPTY_EXPERIENCE }],
};

const PortfolioForm = ({ onSubmit, initialData = null, submitLabel = "Preview Portfolio" }) => {
  const steps = [
    { label: "Personal Info", icon: <PersonOutlineIcon /> },
    { label: "Contact", icon: <ContactMailOutlinedIcon /> },
    { label: "Skills", icon: <CodeIcon /> },
    { label: "Projects", icon: <RocketLaunchOutlinedIcon /> },
    { label: "Experience", icon: <WorkOutlineIcon /> },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialData || INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formData.username || initialData?.username === formData.username) return;
    const timer = setTimeout(async () => {
      if (formData.username.length < 3) return;
      setUsernameStatus("checking");
      try {
        const res = await portfolioAPI.checkUsername(formData.username);
        setUsernameStatus(res.data.available ? "available" : "taken");
      } catch { setUsernameStatus(null); }
    }, 600);
    return () => clearTimeout(timer);
  }, [formData.username]);

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const updateContact = (field, value) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !formData.skills.includes(s)) { update("skills", [...formData.skills, s]); setSkillInput(""); }
  };
  const addProject = () => update("projects", [...formData.projects, { ...EMPTY_PROJECT }]);
  const removeProject = (i) => update("projects", formData.projects.filter((_, idx) => idx !== i));
  const updateProject = (i, field, value) => {
    const updated = [...formData.projects];
    updated[i] = { ...updated[i], [field]: value };
    update("projects", updated);
  };
  const updateProjectTech = (i, val) => {
    const updated = [...formData.projects];
    updated[i].techStack = val.split(",").map(t => t.trim()).filter(Boolean);
    update("projects", updated);
  };
  const addExperience = () => update("experience", [...formData.experience, { ...EMPTY_EXPERIENCE }]);
  const removeExperience = (i) => update("experience", formData.experience.filter((_, idx) => idx !== i));
  const updateExperience = (i, field, value) => {
    const updated = [...formData.experience];
    updated[i] = { ...updated[i], [field]: value };
    update("experience", updated);
  };

  const handleFinalSubmit = async () => {
    const validationErrors = validatePortfolioForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix form errors before submitting");
      setActiveStep(0);
      return;
    }
    if (usernameStatus === "taken") { toast.error("Username already taken"); return; }
    setLoading(true);
    try {
      const cleanedData = {
        ...formData,
        projects: formData.projects.filter(p => p.name.trim()),
        experience: formData.experience.filter(e => e.company.trim() && e.role.trim()),
      };
      await onSubmit(cleanedData);
    } finally { setLoading(false); }
  };

  const stepContent = [
    /* Step 0 – Personal */
    <Box key="personal" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Username *" value={formData.username}
            onChange={e => update("username", e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
            disabled={!!initialData}
            helperText={
              usernameStatus === "checking" ? "Checking availability…" :
              usernameStatus === "available" ? "✓ Available!" :
              usernameStatus === "taken" ? "✗ Username taken" :
              `Your URL: /portfolio/${formData.username || "username"}`
            }
            error={!!errors.username || usernameStatus === "taken"}
            InputProps={{
              endAdornment: usernameStatus && (
                <InputAdornment position="end">
                  <Typography variant="caption" color={usernameStatus === "available" ? "success.main" : usernameStatus === "taken" ? "error" : "text.secondary"}>
                    {usernameStatus === "checking" ? "…" : usernameStatus === "available" ? "✓" : "✗"}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Full Name *" value={formData.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Jane Smith" error={!!errors.fullName} helperText={errors.fullName} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Professional Title" value={formData.title} onChange={e => update("title", e.target.value)} placeholder="Senior Full Stack Developer" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Bio" value={formData.bio} onChange={e => update("bio", e.target.value)} multiline rows={4} placeholder="Tell visitors about yourself, your passion, and what you build..." />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Profile Image URL" value={formData.profileImage} onChange={e => update("profileImage", e.target.value)} placeholder="https://example.com/photo.jpg" type="url"
            InputProps={{ startAdornment: formData.profileImage ? <InputAdornment position="start"><Avatar src={formData.profileImage} sx={{ width: 28, height: 28 }} /></InputAdornment> : null }} />
        </Grid>
      </Grid>
    </Box>,

    /* Step 1 – Contact */
    <Box key="contact" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" value={formData.contact.email} onChange={e => updateContact("email", e.target.value)} placeholder="jane@example.com" error={!!errors.email} helperText={errors.email} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="LinkedIn URL" value={formData.contact.linkedin} onChange={e => updateContact("linkedin", e.target.value)} placeholder="https://linkedin.com/in/jane" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="GitHub URL" value={formData.contact.github} onChange={e => updateContact("github", e.target.value)} placeholder="https://github.com/jane" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Personal Website" value={formData.contact.website} onChange={e => updateContact("website", e.target.value)} placeholder="https://janesmith.dev" />
        </Grid>
      </Grid>
    </Box>,

    /* Step 2 – Skills */
    <Box key="skills" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Add a skill" value={skillInput}
          onChange={e => setSkillInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
          placeholder="e.g. React, Docker, Python…" sx={{ flex: 1 }}
        />
        <Button variant="contained" onClick={addSkill} startIcon={<AddIcon />} sx={{ whiteSpace: "nowrap", minWidth: 100 }}>Add</Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, minHeight: 48 }}>
        {formData.skills.length === 0
          ? <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>No skills yet. Add your first one above.</Typography>
          : formData.skills.map((skill, i) => (
            <Chip key={i} label={skill} onDelete={() => update("skills", formData.skills.filter((_, idx) => idx !== i))}
              color="primary" variant="outlined" sx={{ fontWeight: 500 }} />
          ))
        }
      </Box>
    </Box>,

    /* Step 3 – Projects */
    <Box key="projects" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {formData.projects.map((project, i) => (
        <Card key={i} variant="outlined" sx={{ borderRadius: 3, border: "1px solid", borderColor: "primary.light" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} color="primary">Project {i + 1}</Typography>
              {formData.projects.length > 1 && (
                <Tooltip title="Remove project">
                  <IconButton size="small" color="error" onClick={() => removeProject(i)}><DeleteOutlineIcon /></IconButton>
                </Tooltip>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField label="Project Name *" value={project.name} onChange={e => updateProject(i, "name", e.target.value)} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Tech Stack (comma-separated)" value={project.techStack.join(", ")} onChange={e => updateProjectTech(i, e.target.value)} placeholder="React, Node.js, MongoDB" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="GitHub Link" value={project.githubLink} onChange={e => updateProject(i, "githubLink", e.target.value)} type="url" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Live Demo URL" value={project.liveDemo} onChange={e => updateProject(i, "liveDemo", e.target.value)} type="url" /></Grid>
              <Grid item xs={12}><TextField label="Description" value={project.description} onChange={e => updateProject(i, "description", e.target.value)} multiline rows={3} /></Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={addProject} sx={{ alignSelf: "flex-start" }}>Add Another Project</Button>
    </Box>,

    /* Step 4 – Experience */
    <Box key="experience" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {formData.experience.map((exp, i) => (
        <Card key={i} variant="outlined" sx={{ borderRadius: 3, border: "1px solid", borderColor: "secondary.light" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} color="secondary">Experience {i + 1}</Typography>
              {formData.experience.length > 1 && (
                <Tooltip title="Remove"><IconButton size="small" color="error" onClick={() => removeExperience(i)}><DeleteOutlineIcon /></IconButton></Tooltip>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField label="Company *" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Role *" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Duration" value={exp.duration} onChange={e => updateExperience(i, "duration", e.target.value)} placeholder="Jan 2023 – Present" /></Grid>
              <Grid item xs={12}><TextField label="Description" value={exp.description} onChange={e => updateExperience(i, "description", e.target.value)} multiline rows={3} /></Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Button variant="outlined" color="secondary" startIcon={<AddIcon />} onClick={addExperience} sx={{ alignSelf: "flex-start" }}>Add Experience</Button>
    </Box>,
  ];

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={() => (
                <Box sx={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: activeStep >= index ? "linear-gradient(135deg, #0077b6, #00b4d8)" : "#e0e7ef", color: activeStep >= index ? "#fff" : "#94a3b8", fontSize: 16 }}>
                  {React.cloneElement(step.icon, { fontSize: "small" })}
                </Box>
              )}
            >
              <Typography fontWeight={activeStep === index ? 700 : 500} color={activeStep === index ? "primary.main" : "text.secondary"}>
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              <Box sx={{ pt: 1, pb: 2 }}>
                {stepContent[index]}
                <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                  {index < steps.length - 1 ? (
                    <Button variant="contained" color="primary" onClick={() => setActiveStep(index + 1)}>
                      Continue
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" onClick={handleFinalSubmit} disabled={loading}
                      startIcon={<CheckCircleOutlineIcon />}>
                      {loading ? "Saving…" : submitLabel}
                    </Button>
                  )}
                  {index > 0 && (
                    <Button variant="text" color="inherit" onClick={() => setActiveStep(index - 1)}>Back</Button>
                  )}
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>Please fix the highlighted errors before submitting.</Alert>
      )}
    </Box>
  );
};

export default PortfolioForm;
