import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react'
import { useMainScene } from '../context/MainSceneContext';
import Grid from '@mui/material/Grid2';

const ModelInfoCard = () => {
    const { models, selectedModelId } = useMainScene()

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
                width: 220,
                minHeight: 400,
                bgcolor: "rgba(0, 0, 0, 0.8)",
                p: 0,
                m: 2,
                borderRadius: 2,
                color: "#E8E8E8",
            }}
        >
            <Box sx={{px: 2, pt: 2}}>
                <Typography variant="subtitle" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Model Info
                </Typography>
            </Box>


            <Divider sx={{ background: "#AAAAAA", my: 1 }} component="div" />


            <Grid container spacing={0} sx={{ px: 2 }}>
                <Grid size={12}>
                    <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>Model ID: 312421312</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>Width: 1.003 m</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>Height: 1.124 m</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>Depth: 1.245 m</Typography>
                </Grid>

            </Grid>
        </Box>
    );
}

export default ModelInfoCard