import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { isPropertyAccessOrQualifiedName } from 'typescript';
import { Problem } from '../components/Problem';

const useStyles = makeStyles((theme) => ({
    problemPaper: {
        width: "50%",
        padding: "1rem",
        margin: "auto",
        overflow: "hidden"
    },
}))

export const Practice = (props) => {

    const classes = useStyles();

    const [problemInfo, setProblemInfo] = useState({
        id: 0,
        problemText: "",
        correctAnswer: ""
    });

    const [tries, setTries] = useState(1);
    const [problemsCompleted, setProblemsCompleted] = useState(0);

    useEffect(() => loadNewProblem(), [])

    const submitProblemSolved = async () => {
        const url = "api/submitsolve";

        var data = new FormData();
        data.append("Tries", tries);
        data.append("Time", 1234);
        data.append("UserID", 1);
        data.append("ProblemText", problemInfo.problemText);
        data.append("Answer", problemInfo.correctAnswer);

        await fetch(url, {
            method: 'POST',
            body: data,
            credentials: 'same-origin'
        })
            .then(async (result) => {
                if (!result.ok) {
                    console.log("Submit solve failed");
                }
            })
    }

    const loadNewProblem = () => {
        fetch('api/problem?userID=1')
            .then((res) => res.json())
            .then((problem) => setProblemInfo(problem))
    }

    const handleAnswerSubmit = (correct) => {
        if (correct) {
            setProblemsCompleted(problemsCompleted + 1);
            submitProblemSolved();
            if(problemsCompleted == 9) props.setPracticing(false)
            else {
                loadNewProblem(); 
                setTries(1);
            }
        }
        else setTries(tries + 1);
    }

    return (
        <div>
            <Paper className={classes.problemPaper}>
                <Problem {...({problemInfo, problemsCompleted, })} setPracticing={props.setPracticing} answerSubmitCallback={handleAnswerSubmit} />
            </Paper>
        </div>
    );
}
