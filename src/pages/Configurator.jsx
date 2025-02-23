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

      <Sidebar />
      <ModelInfoCard />

    </Box>
  );
};

export default Configurator;
