import { makeStyles, Card, CardContent, Typography, TextField, Paper, Button } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import React, { useState, useEffect } from 'react'
import { Problem } from '../components/Problem';

const useStyles = makeStyles((theme) => ({
    solvedProblemPaper: {
        width: "75%",
        padding: "1rem",
        margin: "1rem",
        overflow: "hidden"
    },
}));

export const Stats = () => {

    const classes = useStyles();

    const [problems, setProblems] = useState([])

    useEffect(() => {
        fetch('baseapi/getsolvedproblems?userID=2')
            .then((res) => res.json())
            .then((problems) => setProblems(problems));
    }, [])

    const ordinal = (i) => {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" style={{ margin: "0.5rem" }}>Recent problems</Typography>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
                {problems.map((problem) => (
                    <Card style={{ width: "20%", margin: "1rem" }}>
                        <CardContent>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography style={{ fontSize: 30 }}>{problem.problemText}</Typography>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "flex-end" }}>
                                    <Typography>{`${ordinal(problem.tries)} try`}</Typography>
                                    <Typography ><TimerIcon/>{`${problem.time / 1000} s`}</Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
