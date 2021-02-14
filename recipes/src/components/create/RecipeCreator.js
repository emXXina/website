import React, { useState } from 'react';
import { Card, Button, Typography, CardContent, MobileStepper, Divider, makeStyles, useTheme  } from '@material-ui/core';
import AddFundamentals from './AddFundamentals';
import AddIngredients from './AddIngredients';
import FinishingPage from './FinishingPage';

export default function RecipeCreator() {
    const steps = ['Grundlegende Eigenschaften', 'Zutaten', 'Zubereitung', 'Fertig?'];
    const [activeStep, setActiveStep] = useState(1);
    
    function getContent(step) {
        switch(step) {
            case 0:
                return <AddFundamentals/>;
            case 1:
                return <AddIngredients/>;
            case 2:
                return "Zubereitung...";
            case 3:
                return <FinishingPage/>;
            default:
                return "Das sollte nicht passieren.";
        }
    };

    function NextButton() {
        return(
            <div>
                {activeStep === (steps.length - 1) ? (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Fertig
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Weiter
                    </Button>
                )}
            </div>
        );
    }

    function BackButton() {
        return(
            <Button disabled={activeStep === 0} onClick={handleBack}>
                Zurück
            </Button>
        );
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const theme = useTheme();
    const useStyles = makeStyles({
        stepper: {
            padding: 0,
            backgroundColor: theme.palette.common.white
        }
    });
    const classes = useStyles();

    return(
        <Card className="big-card">
            <CardContent>
                <Typography variant="h2">Neues Rezept</Typography>
            </CardContent>

            <Divider/>

            <CardContent>
                <MobileStepper 
                    variant="dots"
                    className={classes.stepper}
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <NextButton />
                    }
                    backButton={
                        <BackButton />
                    }
                />
            </CardContent>

            <Divider/>
            
            <CardContent>
                <div>
                    <Typography variant="h4" component="h3" paragraph>{steps[activeStep]}</Typography>
                    
                    {getContent(activeStep)}
                </div>
            </CardContent>
            
            <Divider/>

            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <BackButton />
                    <NextButton />
                </div>
            </CardContent>
        </Card>
    )
}