import { Button, Paper, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomIcon from './CustomIcon';
import { useMainScene } from '../context/MainSceneContext';

const Toolbar = () => {
    const [toolBarVisibility, setToolBarVisibility] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { selectedTransformControl, setSelectedTransformControl, selectedModelId } = useMainScene();

    const circleButtonSx = (index) => ({
        borderRadius: '50%',
        minWidth: '40px',
        minHeight: '40px',
        padding: '0',
        mx: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: selectedIndex === index ? '2px solid #2C99FF' : 'none',
        backgroundColor: selectedIndex === index ? 'black' : 'default',
        '&:hover': {
            backgroundColor: 'black',
        },
    });

    useEffect(() => {
        switch (selectedTransformControl) {
            case "move":
                setSelectedIndex(0);
                break;
            case "scale":
                setSelectedIndex(1);
                break;
            case "rotate":
                setSelectedIndex(2);
                break;
            default:
                setSelectedIndex(null);
                break;
        }
    }, [selectedTransformControl]);

    useEffect(() => {
        if (selectedModelId === null) {
            setToolBarVisibility(false);
        } else {
            setToolBarVisibility(true);
        }
    }, [selectedModelId]);

    const handleClick = (index, type) => {
        setSelectedIndex(index);
        setSelectedTransformControl(type);
    };

    return (
        <Fade in={toolBarVisibility} timeout={500}>
            <Paper
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    bottom: 0,
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    m: 2,
                    p: '10px',
                    borderRadius: '10px',
                    bgcolor: '#000000CC',
                    color: 'white',
                    visibility: toolBarVisibility ? 'visible' : 'hidden', // Görünürlüğü kontrol et
                }}
            >
                <Button
                    variant="contained"
                    size="small"
                    sx={circleButtonSx(0)}
                    onClick={() => handleClick(0, "move")}
                >
                    <CustomIcon src="/icons/move.svg" style={{ width: '24px', height: '24px' }} />
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    sx={circleButtonSx(1)}
                    onClick={() => handleClick(1, "scale")}
                >
                    <CustomIcon src="/icons/scaling.svg" style={{ width: '16px', height: '16px' }} />
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    sx={circleButtonSx(2)}
                    onClick={() => handleClick(2, "rotate")}
                >
                    <CustomIcon src="/icons/rotation.svg" style={{ width: '24px', height: '24px' }} />
                </Button>
            </Paper>
        </Fade>
    );
};

export default Toolbar;