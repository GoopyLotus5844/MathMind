import React, { useState, useEffect } from 'react'
import { Problem } from '../components/Problem';

export const Home = () => {

    const [problemInfo, setProblemInfo] = useState({
        id: 0,
        problemText: "",
        correctAnswer: ""
    });

    const [tries, setTries] = useState(1);

    useEffect(() => loadNewProblem(), [])

    const submitProblemSolved = async () => {
        console.log(JSON.stringify(problemInfo));
        const url = "baseapi/solve";

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
                    console.log("submit solve failed");
                } else
                    console.log("pog");
            })
        setTries(1)
    }

    const loadNewProblem = () => {
        fetch('baseapi/problem?userID=1')
            .then((res) => res.json())
            .then((problem) => setProblemInfo(problem))
    }

    const handleAnswerSubmit = (correct) => {
        if (correct) {
            submitProblemSolved();
            loadNewProblem();
        }
        else setTries(tries + 1);
    }

    return (
        <div>
            <Problem problemInfo={problemInfo} answerSubmitCallback={handleAnswerSubmit}/>
        </div>
    );
}
