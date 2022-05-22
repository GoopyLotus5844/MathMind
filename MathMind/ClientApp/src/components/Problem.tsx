import { Typography, TextField, Button, IconButton, Box, ButtonProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react'
import { PracticeType } from '../definitions/PracticeType';
import { ProblemInfo } from '../definitions/API';
import { styled } from "@mui/material/styles";

interface Props {
    practiceType: PracticeType,
    setPracticing: React.Dispatch<React.SetStateAction<boolean>>,
    problemsCompleted: number,
    answerSubmitCallback: (correct: boolean) => void,
    problemInfo: ProblemInfo
}

interface SubmitButtonProps extends ButtonProps {
    secondTry?: boolean;
}

const SubmitButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "secondTry",
})<SubmitButtonProps>(({ theme, secondTry }) => ({
    color: "#FFF",
    backgroundColor: secondTry ? theme.palette.error.main : theme.palette.primary.main,
    '&:hover':{
        backgroundColor: secondTry ? theme.palette.error.dark : theme.palette.primary.dark
    },
    marginTop: "1rem",
}));

export const Problem = (props: Props) => {
    const { problemInfo, answerSubmitCallback } = props;

    const [answer, setAnswer] = useState("");
    const [answerError, setAnswerError] = useState("");
    const [buttonText, setButtonText] = useState("Submit");

    useEffect(() => {
        setAnswer("")
        setButtonText("Submit")
    }, [problemInfo])

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswer(event.target.value.trim());
        if(props.practiceType === 0 && !/^\d+$/.test(event.target.value)) 
            setAnswerError("Please enter a positive integer");
        else
            setAnswerError("");
    }

    const handleAnswerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(answer !== "" && answerError === "") {
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
        <Box>
            <Box sx = {{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Typography variant="h2">{problemInfo.problemText}</Typography>
                <IconButton size="small" onClick={() => props.setPracticing(false)}><CloseIcon></CloseIcon></IconButton>
            </Box>
            
            <Box sx = {{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <form onSubmit={handleAnswerSubmit}>
                    <TextField 
                        id="answer-field" 
                        label="Answer" 
                        value={answer} 
                        variant="filled" 
                        autoComplete="off"
                        onChange={handleAnswerChange} 
                        helperText={answerError}
                        error={answerError !== ''}/>
                    <br/>
                    <SubmitButton 
                        type="submit" 
                        variant="contained" 
                        secondTry={buttonText != "Submit"}
                        style={{marginTop: '1rem'}}
                    >
                        {buttonText}
                    </SubmitButton>
                </form>
                <Typography>{`Problem ${props.problemsCompleted} / 10`}</Typography>
            </Box>
        </Box>
    );
}