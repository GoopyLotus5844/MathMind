import { Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Problem } from '../components/Problem';
import { ProblemInfo } from '../definitions/API';
import { PracticeType } from '../definitions/PracticeType';

interface Props {
    practiceType: PracticeType,
    practicing: boolean,
    setPracticing: React.Dispatch<React.SetStateAction<boolean>>
}

export const Practice = (props: Props) => {
    const [problemInfo, setProblemInfo] = useState<ProblemInfo>({
        id: 0,
        problemText: "",
        correctAnswer: ""
    });

    const [tries, setTries] = useState(1);
    const [problemsCompleted, setProblemsCompleted] = useState(0);

    var startTime = Date.now();

    useEffect(() => loadNewProblem(), [])

    const submitProblemSolved = async (time: number) => {
        const url = "api/submitsolve";

        var data = new FormData();
        data.append("Tries", tries.toString());
        data.append("Time", time.toString());
        data.append("UserID", "1");
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
        fetch(`api/problem?userID=1&type=${props.practiceType}`)
            .then((res) => res.json())
            .then((problem: ProblemInfo) => setProblemInfo(problem))
    }

    const handleAnswerSubmit = (correct: boolean) => {
        if (correct) {
            setProblemsCompleted(problemsCompleted + 1);
            var currentTime = Date.now();
            submitProblemSolved(currentTime - startTime);
            startTime = currentTime;
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
            <Paper sx={{
                width: "50%",
                padding: "1rem",
                margin: "auto",
                marginTop: "1rem",
                overflow: "hidden"
            }}>
                <Problem {...({problemInfo, problemsCompleted, })} setPracticing={props.setPracticing} practiceType={props.practiceType} answerSubmitCallback={handleAnswerSubmit} />
            </Paper>
        </div>
    );
}
