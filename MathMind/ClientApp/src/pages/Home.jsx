import { makeStyles, Typography, Card, CardContent, Button, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Problem } from '../components/Problem';
import { Practice } from './Practice';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& .MuiCard-root': {
            width: '500px',
            height: '300px',
            margin: "1rem"
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
        (<Grid container spacing={3}>
            <Grid item xs={4}>
                <Card>
                    <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h4">Addition</Typography>
                        <Button onClick={() => startPractice("Addition")}variant="contained">Practice</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h4">Subtraction</Typography>
                        <Button onClick={() => startPractice("Subtraction")} variant="contained">Practice</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h4">Mutliplication</Typography>
                        <Button onClick={() => startPractice("Multiplication")} variant="contained">Practice</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>) 
    );
}
