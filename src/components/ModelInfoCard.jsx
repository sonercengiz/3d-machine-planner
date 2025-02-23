import { Box, Paper, Typography } from '@mui/material';
import React from 'react'

const ModelInfoCard = ({ id, modelName }) => {
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
                {modelName}
            </Typography>
            <Paper
                draggable
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
                    {id}
                </Typography>
            </Paper>

        </Box>
    );
}

export default ModelInfoCard