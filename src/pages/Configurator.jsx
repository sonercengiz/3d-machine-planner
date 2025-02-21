import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import MachineScene from "../scenes/MachineScene";

const Configurator = () => {
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* 3D Sahne Tüm Ekranı Kaplayacak */}
      <MachineScene />
      
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
    </Box>
  );
};

export default Configurator;
