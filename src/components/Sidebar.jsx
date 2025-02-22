import { Box, Paper, Typography } from "@mui/material";

const modules = [
  { id: "model1", name: "model1", path: "/assets/models/8e1fcf55-8fa2-4fc7-a917-ef6c8c836b5e.fbx" },
  { id: "model2", name: "model2", path: "/assets/models/wrong.fbx" },
];

const Sidebar = () => {
  const handleDragStart = (event, module) => {
    event.dataTransfer.setData("moduleType", module.id);
    event.dataTransfer.setData("modelPath", module.path); // Model dosya yolunu da gönderelim
    console.log(`Sürüklenen model: ${module.name} - Path: ${module.path}`);
  };

  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "rgba(0, 0, 0, 0.8)",
        p: 2,
        borderRadius: 2,
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}>
        Modüller
      </Typography>
      {modules.map((module) => (
        <Paper
          key={module.id}
          draggable
          onDragStart={(event) => handleDragStart(event, module)}
          sx={{
            p: 2,
            my: 1,
            textAlign: "center",
            cursor: "grab",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            borderRadius: 1,
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          {module.name}
        </Paper>
      ))}
    </Box>
  );
};

export default Sidebar;
