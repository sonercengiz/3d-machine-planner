import { Box, Paper, Typography } from "@mui/material";

const modules = [
  { id: "engine", name: "Motor" },
  { id: "conveyor", name: "Konveyör" },
  { id: "frame", name: "Çerçeve" },
];

const Sidebar = () => {
  const handleDragStart = (event, module) => {
    event.dataTransfer.setData("moduleType", module.id);
  };

  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "rgba(0, 0, 0, 0.8)", // Şeffaf siyah arka plan
        p: 2,
        borderRadius: 2, // Hafif yuvarlatılmış kenarlar
        color: "white", // Metin rengini beyaz yapalım
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
            bgcolor: "rgba(255, 255, 255, 0.1)", // Hafif şeffaf beyaz
            color: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)", // Hafif gölge efekti
            borderRadius: 1,
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.2)", // Hover olduğunda daha belirgin beyaz
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
