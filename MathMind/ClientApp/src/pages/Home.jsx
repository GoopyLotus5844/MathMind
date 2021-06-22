import { makeStyles, Typography, Card, CardContent, Button, Grid, CardMedia } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Problem } from '../components/Problem';
import { Practice } from './Practice';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& .MuiCard-root': {
            width: '300px',
            height: '300px',
            margin: "1rem",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        '& .MuiCardContent-root':{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between'
        },
        '& .MuiButton-root':{
            margin: '1rem'
        }
    }
}));

export const Home = () => {

    const classes = useStyles();

    const [practicing, setPracticing] = useState(false);
    const [practiceType, setPracticeType] = useState("");

    const startPractice = (type) => {
        setPracticing(true);
        setPracticeType(type);
    }

    return (
        practicing ?
        (<Practice {...({practiceType, practicing, setPracticing})}/>)
        :
        (<div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography variant="h4">Addition</Typography>
                </CardContent>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={() => startPractice(0)}variant="contained">Practice</Button>
                </div>
            </Card>
        
            <Card>
                <CardContent>
                    <Typography variant="h4">Subtraction</Typography>
                </CardContent>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={() => startPractice(1)}variant="contained">Practice</Button>
                </div>
            </Card>
            
            <Card>
                <CardContent>
                    <Typography variant="h4">Multiplication</Typography>
                </CardContent>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={() => startPractice(2)}variant="contained">Practice</Button>
                </div>
            </Card>
        </div>)
    );
}
