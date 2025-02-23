import React, { useEffect } from 'react'
import { useMainScene } from '../context/MainSceneContext'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Typography } from '@mui/material'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
const ObjectsMenuContent = () => {
    const { models, selectedModelId, setSelectedModelId } = useMainScene()

    const handleClick = (modelId) => {
        setSelectedModelId(modelId)
    }

    // nested list
    // const [open, setOpen] = React.useState(true);
    // const handleClick = () => {
    //     setOpen(!open);
    // };

    useEffect(() => {
        console.log(models);

    }, [models]);
    return (
        <>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    color: "#FFFFFF",
                    fontSize: "12px",
                }}
                component="nav"
                subheader={
                    <ListSubheader sx={{ fontSize: "10px", color: "#FFF", bgcolor: "inherit" }}>
                        Model List in the Scene
                    </ListSubheader>
                }
            >
                {models.map((model, index) => (
                    <ListItemButton
                        key={index}
                        sx={{ background: selectedModelId === model.id ? "#000" : "inherit" }}
                        onClick={(e) => handleClick(model.id)}
                    >
                        <ListItemIcon sx={{ color: "#FFF" }}>
                            <ViewInArIcon />
                        </ListItemIcon>
                        <ListItemText primary={model.name} primaryTypographyProps={{ fontSize: "12px" }} />
                    </ListItemButton>
                ))}

                {/* <ListItemButton onClick={handleClick}>
                    <ListItemIcon sx={{ color: "#FFF" }}>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" primaryTypographyProps={{ fontSize: "12px" }} />
                    {open ? <ExpandLess sx={{ color: "#FFF" }} /> : <ExpandMore sx={{ color: "#FFF" }} />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon sx={{ color: "#FFF" }}>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" primaryTypographyProps={{ fontSize: "12px" }} />
                        </ListItemButton>
                    </List>
                </Collapse> */}
            </List>
        </>
    )
}

export default ObjectsMenuContent