import React, { useState } from 'react';
import { Card, Button, Typography, CardContent, Stepper, Step, StepLabel, Divider } from '@material-ui/core';
import AddFundamentals from './AddFundamentals';

export default function RecipeCreator() {
    const steps = ['Grundlegende Eigenschaften', 'Zutaten', 'Zubereitung'];
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set());
    
    function getContent(step) {
        switch(step) {
            case 0:
                return <AddFundamentals/>;
            case 1:
                return "Zutaten...";
            case 2:
                return "Zubereitung...";
            default:
                return "Das sollte nicht passieren.";
        }
    }
    const isCompleted = (index) => {
        return completed.has(index);
    }

    const handleNext = () => {
        if (isNowComplete()) {
            setCompleted((prevCompleted) => {
                const newCompleted = new Set(prevCompleted.values());
                newCompleted.add(activeStep);
                return newCompleted;
            });
        }
        
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(completed);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isNowComplete = () => {
        return true;
    }

    return(
        <Card className="big-card">
            <CardContent>
                <Typography variant="h2">Neues Rezept</Typography>

                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        if(!isCompleted(index) || index === activeStep) {
                            stepProps.completed = false;
                        }
                        return(
                            <Step key={label} {...stepProps}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </CardContent>

            <Divider/>
            
            <CardContent>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography variant="h4" component="h3" paragraph>Fertig?</Typography>
                        
                            <Typography>Wenn du sicher bist, dass du wirklich fertig bist, drücke auf Fertig.</Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h4" component="h3" paragraph>{steps[activeStep]}</Typography>
                            
                            {getContent(activeStep)}
                        </div>
                    )}
                </div>
            </CardContent>
            
            <Divider/>

            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Zurück
                    </Button>
                    {activeStep === steps.length ? (
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Fertig
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Weiter
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}