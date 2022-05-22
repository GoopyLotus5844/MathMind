import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import React, { useState, useEffect } from "react";
import { StatProblem } from "../definitions/API";

export const Stats = () => {
    const [problems, setProblems] = useState<StatProblem[]>([]);

    useEffect(() => {
        fetch("api/solvedproblems?userID=1")
            .then((res) => res.json())
            .then((problems: StatProblem[]) => setProblems(problems));
    }, []);

    const ordinal = (i: number) => {
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant="h4" style={{ margin: "0.5rem" }}>
                Recent problems
            </Typography>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirectoin: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {problems.map((problem, index) => (
                    <Card
                        key={index}
                        style={{ width: "300px", margin: "1rem" }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h4">
                                    {problem.problemText}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "end",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Typography>{`${ordinal(
                                        problem.tries
                                    )} try`}</Typography>
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <TimerIcon />
                                        {`${problem.time / 1000} s`}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};
