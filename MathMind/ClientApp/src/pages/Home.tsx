import {Typography, Card, CardContent, Button, Box } from '@mui/material';
import React, { useState } from 'react'
import { Practice } from './Practice';
import {PracticeType} from '../definitions/PracticeType';
import {styled} from '@mui/material/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         '& .MuiCard-root': {
//             width: '300px',
//             height: '300px',
//             margin: "1rem",
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between'
//         },
//         '& .MuiCardContent-root':{
//             backgroundColor: theme.palette.primary.main,
//             color: 'white',
//             display: 'flex', 
//             flexDirection: 'column', 
//             justifyContent: 'space-between'
//         },
//         '& .MuiButton-root':{
//             margin: '1rem'
//         }
//     }
// }));

const StyledCard = styled(Card)(({theme}) => ({
    width: '300px',
    height: '300px',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

const StyledCardContent = styled(CardContent)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: "white",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const Home = () => {
    const [practicing, setPracticing] = useState(false);
    const [practiceType, setPracticeType] = useState<PracticeType>(PracticeType.Addition);

    const startPractice = (type: PracticeType) => {
        setPracticing(true);
        setPracticeType(type);
    }

    return (
        practicing ?
        (<Practice {...({practiceType, practicing, setPracticing})}/>)
        :
        (<Box sx={{
            display: "flex"
        }}>
            <StyledCard>
                <StyledCardContent>
                    <Typography variant="h4">Addition</Typography>
                </StyledCardContent>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: "1rem"}}>
                    <Button onClick={() => startPractice(PracticeType.Addition)} variant="contained">Practice</Button>
                </Box>
            </StyledCard>
        
            <StyledCard>
                <StyledCardContent>
                    <Typography variant="h4">Subtraction</Typography>
                </StyledCardContent>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: "1rem"}}>
                    <Button onClick={() => startPractice(PracticeType.Subtraction)} variant="contained">Practice</Button>
                </Box>
            </StyledCard>
            
            <StyledCard>
                <StyledCardContent>
                    <Typography variant="h4">Multiplication</Typography>
                </StyledCardContent>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: "1rem"}}>
                    <Button onClick={() => startPractice(PracticeType.Multiplication)} variant="contained">Practice</Button>
                </Box>
            </StyledCard>
        </Box>)
    );
}
