import { makeStyles, Typography, TextField, Paper, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    submitButtonFirstTry:{
        color: "#FFF",
        backgroundColor: theme.palette.primary.main,
        '&:hover':{
            backgroundColor: theme.palette.primary.dark
        },
    },
    submitButtonSecondTry:{
        color: "#FFF",
        backgroundColor: theme.palette.error.main,
        '&:hover':{
            backgroundColor: theme.palette.error.dark
        },
    },
}))

export const Problem = (props) => {

    const classes = useStyles();

    const { problemInfo, answerSubmitCallback } = props;

    const [answer, setAnswer] = useState("");
    const [answerError, setAnswerError] = useState("");
    const [buttonText, setButtonText] = useState("Submit");

    useEffect(() => {
        setAnswer("")
        setButtonText("Submit")
    }, [problemInfo])

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value)
        if(!/^\d+$/.test(event.target.value)) 
            setAnswerError("Please enter a positive integer");
        else
            setAnswerError("");
    }

    const handleAnswerSubmit = (event) => {
        event.preventDefault();
        if(answer != "" && answerError == "") {
            if(answer == problemInfo.correctAnswer) {
                answerSubmitCallback(true)
            }
            else {
                setButtonText("Try again")
                answerSubmitCallback(false)
            }
        }
    }

    return (
        <div>
            <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Typography variant="h2">{problemInfo.problemText}</Typography>
                <IconButton size="small" onClick={() => props.setPracticing(false)}><CloseIcon></CloseIcon></IconButton>
            </div>
            
            <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <form onSubmit={handleAnswerSubmit}>
                    <TextField 
                        id="answer-field" 
                        label="Answer" 
                        value={answer} 
                        variant="filled" 
                        autoComplete="off"
                        onChange={handleAnswerChange} 
                        helperText={answerError}
                        error={answerError != ''}/>
                    <br/>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        style={{marginTop: '1rem'}}
                        className={buttonText == "Submit" ? classes.submitButtonFirstTry : classes.submitButtonSecondTry}
                    >
                        {buttonText}
                    </Button>
                </form>
                <Typography>{`Problem ${props.problemsCompleted} / 10`}</Typography>
            </div>
        </div>
    );
}