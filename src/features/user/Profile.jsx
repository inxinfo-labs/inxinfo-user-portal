import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../context/AuthContext";
import ViewProfile from "./ViewProfile";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePic from "./UploadProfilePic";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";

const tabs = [
  { key: "view", label: "View Profile", icon: <PersonIcon /> },
  { key: "edit", label: "Edit Profile", icon: <EditIcon /> },
  { key: "pic", label: "Profile Picture", icon: <PhotoCameraIcon /> },
];

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        My Profile
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Manage your profile information and preferences
      </Typography>

      <Card variant="outlined" sx={{ overflow: "hidden" }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "action.hover",
            "& .MuiTab-root": { fontWeight: 600 },
            "& .Mui-selected": { color: "primary.main", bgcolor: "background.paper", fontWeight: 700 },
            "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0", bgcolor: "primary.main" },
            "& .MuiTab-root:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
          }}
        >
          {tabs.map((t, idx) => (
            <Tab
              key={t.key}
              label={t.label}
              icon={t.icon}
              iconPosition="start"
              sx={{
                "&:hover": { bgcolor: "action.selected" },
                "&:focus": { bgcolor: "action.selected" },
                "&.Mui-selected": { bgcolor: "background.paper" },
              }}
            />
          ))}
        </Tabs>
        <CardContent sx={{ p: 3 }}>
          {activeTab === 0 && <ViewProfile />}
          {activeTab === 1 && <UpdateProfile />}
          {activeTab === 2 && <UploadProfilePic />}
        </CardContent>
      </Card>
    </Box>
  );
}
