import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";
import ViewProfile from "./ViewProfile";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePic from "./UploadProfilePic";
import ChangePassword from "./ChangePassword";
import TwoFactorSettings from "./TwoFactorSettings";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import CircularProgress from "@mui/material/CircularProgress";

const tabs = [
  { key: "view", label: "View Profile", icon: <PersonIcon />, content: ViewProfile },
  { key: "edit", label: "Edit Profile", icon: <EditIcon />, content: UpdateProfile },
  { key: "pic", label: "Profile Picture", icon: <PhotoCameraIcon />, content: UploadProfilePic },
  { key: "password", label: "Change password", icon: <LockIcon />, content: ChangePassword },
  { key: "security", label: "Security (2FA)", icon: <SecurityIcon />, content: TwoFactorSettings },
];

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(null);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  const handleOpen = (key) => setOpenModal(key);
  const handleClose = () => setOpenModal(null);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        My Profile
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Manage your profile information and preferences
      </Typography>

      <Card variant="outlined">
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {tabs.map((t) => (
              <Card
                key={t.key}
                variant="outlined"
                sx={{
                  flex: "1 1 160px",
                  minWidth: 140,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "action.hover",
                    borderColor: "primary.main",
                    boxShadow: 1,
                  },
                }}
                onClick={() => handleOpen(t.key)}
              >
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 2 }}>
                  <Box sx={{ color: "primary.main" }}>{t.icon}</Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {t.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>

      {openModal && (() => {
        const tab = tabs.find((t) => t.key === openModal);
        if (!tab) return null;
        const Content = tab.content;
        return (
          <Dialog
            open
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 2,
                maxHeight: "90vh",
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: 1,
                borderColor: "divider",
                py: 2,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {tab.label}
              </Typography>
              <IconButton aria-label="close" onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Box sx={{ p: 3, overflow: "auto" }}>
              <Content />
            </Box>
          </Dialog>
        );
      })()}
    </Box>
  );
}
