import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import MainScene from "../scenes/MainScene";
import ModelInfoCard from "../components/ModelInfoCard";

const Configurator = () => {
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* 3D Sahne Tüm Ekranı Kaplayacak */}
      <MainScene />

      {/* Sidebar Overlay gibi Üstte Duracak */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20, // Sidebar'ı sol üst köşeye sabitle
          zIndex: 1, // Üstte görünmesini sağla
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{
        position: "absolute",
        top: 20,
        right: 20, // Sidebar'ı sol üst köşeye sabitle
        zIndex: 1, // Üstte görünmesini sağla
      }}>
        <ModelInfoCard />
      </Box>

    </Box>
  );
};

export default Configurator;
