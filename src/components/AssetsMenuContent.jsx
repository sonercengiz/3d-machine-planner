import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useMainScene } from '../context/MainSceneContext';
import axios from "axios";

const AssetsMenuContent = () => {
    const [models, setModels] = useState([{
        "id": "model",
        "name": "Test Model",
        "path": "/assets/models/8e1fcf55-8fa2-4fc7-a917-ef6c8c836b5e.fbx"
      },
      {
        "id": "shelf",
        "name": "Shelf",
        "path": "/assets/models/shelf.fbx"
      }]);
    const [loading, setLoading] = useState(false);
    const { saveCurrentAssembly, loadAssemblyFromFile } = useMainScene();

    const handleDragStart = (event, model) => {
        event.dataTransfer.setData("modelId", model.id);
        event.dataTransfer.setData("modelName", model.name);
        event.dataTransfer.setData("modelPath", model.path);
    };

    // useEffect(() => {
    //     axios.get("/api/json/models")
    //         .then(response => {
    //             setModels(response.data)
    //             setLoading(false)
    //         })
    //         .catch(error => console.error("Error fetching data:", error));
    // }, []);

    if (loading) {
        return (
            <Box justifyContent="center" display="flex">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
            {models.map((model) => (
                <Paper
                    key={model.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, model)}
                    sx={{
                        my: 1,
                        mx: 2,
                        py: 2,
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
                    <Typography variant="subtitle" fontSize="14px">
                        {model.name}
                    </Typography>

                </Paper>
            ))}
            {/* <hr />
            <Box display={"flex"} justifyContent={"space-evenly"}>
                <Button variant="contained" size="small" onClick={saveCurrentAssembly}>
                    Kaydet
                </Button>
                <Button variant="contained" size="small" onClick={loadAssemblyFromFile}>
                    Yükle
                </Button>
            </Box> */}
        </>
    )
}

export default AssetsMenuContent