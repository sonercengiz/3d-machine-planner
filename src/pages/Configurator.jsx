import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import MainScene from "../scenes/MainScene";
import ModelInfoCard from "../components/ModelInfoCard";
import TransformControlBar from "../components/TransformControlBar";
import Toolbar from "../components/Toolbar";

const Configurator = () => {
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh" }}>
      <MainScene />

      <Sidebar />
      <ModelInfoCard />
      <TransformControlBar/>
      <Toolbar/>

    </Box>
  );
};

export default Configurator;
