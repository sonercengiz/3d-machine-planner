import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import { useMainScene } from '../context/MainSceneContext';

const ModelInfoCard = ({ id, modelName }) => {
    const { models, } = useMainScene()
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                width: 220,
                bgcolor: "rgba(0, 0, 0, 0.8)",
                p: 2,
                m: 2,
                borderRadius: 2,
                color: "white",
            }}
        >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}>
                {modelName}
            </Typography>
            <Paper
                sx={{
                    p: 2,
                    my: 1,
                    textAlign: "center",
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
                    {id}
                </Typography>
            </Paper>

        </Box>
    );
}

export default ModelInfoCard