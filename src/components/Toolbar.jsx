import { Button, Paper, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomIcon from './CustomIcon';
import { useMainScene } from '../context/MainSceneContext';

const Toolbar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
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
            case "cursor":
                setSelectedIndex(0);
                break;
            case "selection":
                setSelectedIndex(1);
                break;
            default:
                setSelectedIndex(0);
                break;
        }
    }, [selectedTransformControl]);

    const handleClick = (index, type) => {
        setSelectedIndex(index);
    };

    return (
        <Paper
            sx={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, 0)',
                m: 2,
                p: '10px',
                borderRadius: '10px',
                bgcolor: '#000000CC',
                color: 'white',
            }}
        >
            <Button
                variant="contained"
                size="small"
                sx={circleButtonSx(0)}
                onClick={() => handleClick(0, "move")}
            >
                <CustomIcon src="/icons/cursor.svg" style={{ width: '24px', height: '24px' }} />
            </Button>
            <Button
                variant="contained"
                size="small"
                sx={circleButtonSx(1)}
                onClick={() => handleClick(1, "scale")}
            >
                <CustomIcon src="/icons/selection.svg" style={{ width: '16px', height: '16px' }} />
            </Button>
        </Paper>
    );
};

export default Toolbar;