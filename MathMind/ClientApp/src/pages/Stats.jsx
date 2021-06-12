import { makeStyles, Typography, TextField, Paper, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Problem } from '../components/Problem';

const useStyles = makeStyles((theme) => ({
    statsPaper: {
        width: "75%",
        padding: "1rem",
        margin: "auto",
        overflow: "hidden"
    },
}));

export const Stats = () => {

    const classes = useStyles();

    return (
        <Paper className={classes.statsPaper}>
            <Typography>Hello there</Typography>
        </Paper>
    );
}
