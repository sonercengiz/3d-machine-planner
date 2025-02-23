import { Box, Paper, Typography } from "@mui/material";

const models = [
  { id: "model1", name: "model", path: "/assets/models/8e1fcf55-8fa2-4fc7-a917-ef6c8c836b5e.fbx" },
  { id: "piston", name: "piston", path: "/assets/models/piston.fbx" },
];

const Sidebar = () => {
  const handleDragStart = (event, model) => {
    event.dataTransfer.setData("modelType", model.id);
    event.dataTransfer.setData("modelPath", model.path); // Model dosya yolunu da gönderelim
    console.log(`Sürüklenen model: ${model.name} - Path: ${model.path}`);
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
      {models.map((model) => (
        <Paper
          key={model.id}
          draggable
          onDragStart={(event) => handleDragStart(event, model)}
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
          <Typography variant="subtitle">
            {model.name}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Sidebar;
