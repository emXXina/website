import React, { useState } from 'react';
import { Card, Button, Typography, CardContent, MobileStepper, Divider, makeStyles, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import AddFundamentals from './AddFundamentals';
import AddIngredientCategories from './AddIngredientCategories';
import AddIngredients from './AddIngredients';
import FinishingPage from './FinishingPage';
import AddInstructions from './AddInstructions';

export default function RecipeCreator() {
    const steps = ['Grundlegende Eigenschaften',/*  'Zutatenkategorien', 'Zutaten', 'Zubereitung',*/ 'Fertig?' ];
    const [activeStep, setActiveStep] = useState(0);

    const units = ["", "EL", "TL", "ml", "l", "mg", "g", "kg", "Stück", "Tropfen", "Prise(n)", "Pck", "Scheibe(n)", "Tasse(n)", "Pfund"];
    const instructionTemplates = [0, 1];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredientsInCategories, setIngredientsInCategories] = useState([ 
        {
            name: "main",
            ingredients: [
                {
                    name: "", 
                    unit: units[0],
                    quantity: 0 
                }
            ]
        }
    ]);
    const [instructions, setInstructions] = useState([
        {
            template: instructionTemplates[0],
            text: "",
            state: ""
        }
    ]);

    // methods to control categories
    /* const getCategories = () => {return categories}

    const addCategory = () => {        
        categories.push("");
        setCategories(categories.slice());
    }

    const renameCategory = (idx, value) => {
        categories[idx] = value;
        setCategories(categories.slice());
    }
    
    const removeCategory = (idx) => {
        categories.splice(idx, 1)
        setCategories(categories.slice());
    } */

    // methods to control ingredients
    /* const setIngredient = (idx, attribute, value) => {
        ingredients[idx] = {
            ...ingredients[idx],
            [attribute]: value
        };
        setIngredients(ingredients.slice());
    }

    const getIngredient = (idx) => {return ingredients[idx]}

    const getIngredients = () => {return ingredients}
                                            
    const addIngredient = () => {
        ingredients.push(basicIngredient);
        setIngredients(ingredients.slice());
    };

    const removeIngredient = (idx) => {
        ingredients.splice(idx, 1);
        setIngredients(ingredients.slice());
    } */

    // methos to control instructions
    /* const getInstruction = (idx) => {return instructions[idx]}
    const getInstructions = () => {return instructions}
    const addInstruction = () => {
        instructions.push(basicInstruction);
        setInstruction(instructions.slice());
    }
    const setInstruction = (idx, attribute, value) => {
        instructions[idx] = {
            ...instructions[idx],
            [attribute]: value
        };
        setInstructions(instructions.slice());

        if (attribute === "state") {
            switch(instructions[idx].template) {
                case 0:
                    instructions[idx] = {
                        ...instructions[idx],
                        'text': instructions[idx].state
                    };
                    setInstructions(instructions.slice());
                    break;
                case 1:
                    const state = instructions[idx].state;
                    var text = "Mische "
                    for (var i = 0; i < state.length - 1; i++) {
                        text += state[i] + ", ";
                    }
                    text += " und " + state[state.length- 1] + ".";
                    instructions[idx] = {
                        ...instructions[idx],
                        'text': text
                    };
                    setInstructions(instructions.slice());
                    break;
                default:
                    throw new Error("Invalid template.");
            }
        }
    }

    const removeInstruction = (idx) => {
        instructions.splice(idx, 1);
        setInstructions(instructions.slice());
    } */

    // methods to control stepper
    function getContent(step) {
        switch(step) {
            case 0:
                return <AddFundamentals
                            setName={setName}
                            name={name}
                            setDescription={setDescription}
                            description={description} 
                        />;
           /*  case 1:
                return <AddIngredientCategories
                            classes={classes}
                            getCategories={getCategories}
                            addCategory={addCategory}
                            renameCategory={renameCategory}
                            removeCategory={removeCategory}
                        />;
            case 2:
                return <AddIngredients
                            classes={classes}
                            units={units}
                            getCategories={getCategories}
                            setIngredient={setIngredient}
                            getIngredient={getIngredient}
                            getIngredients={getIngredients}
                            addIngredient={addIngredient}
                            removeIngredient={removeIngredient}
                        />;
            case 3:
                return <AddInstructions
                            classes={classes}
                            addInstruction={addInstruction}
                            setInstruction={setInstruction}
                            getInstruction={getInstruction}
                            getInstructions={getInstructions}
                            removeInstruction={removeInstruction}
                            templates={instructionTemplates}
                            getIngredients={getIngredients}
                        />; */
            case 1:
                return <FinishingPage
                            name={name}
                            description={description}
                            ingredientsInCategories={ingredientsInCategories}
                            instructions={instructions}
                        />;
            default:
                return "Das sollte nicht passieren.";
        }
    };

    function NextButton() {
        return(
            <div>
                {activeStep === (steps.length - 1) ? (
                    <Button variant="contained" color="primary" onClick={handleFinish}>
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

    const [isNoTitleDialogOpen, setIsNoTitleDialogOpen] = useState(false);
    const closeNoTitleDialog = () => setIsNoTitleDialogOpen(false)
    const openNoTitleDialog = () => setIsNoTitleDialogOpen(true)

    const isInvalidRecipe = () => {
        if (name === "") {
            openNoTitleDialog();
            return true;
        }

        return false;
    }

    const handleFinish = () => {
        if (isInvalidRecipe()) {
            return;
        }

        instructions.forEach((instruction) => {
            delete instruction.template;
            delete instruction.state;
        })

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
                'description': description,
                'ingredientsInCategories': ingredientsInCategories,
                'instructions': instructions
            })
        };

        fetch('https://finnupa.de/backend/recipe', requestOptions)
            .then(response => response.json())
            .then(data => window.location = `../rezept/${data.id}` )
            .catch(error => console.log(error))
    };

    const theme = useTheme();
    const useStyles = makeStyles({
        stepper: {
            padding: 0,
            backgroundColor: theme.palette.common.white
        },
        tile: {
            marginBottom: "1rem"
        },
        container: {
            borderRadius: theme.shape.borderRadius,
            borderColor: theme.palette.divider,
            borderWidth: '1px',
            borderStyle: 'solid',
            padding: '.4rem',
            background: theme.palette.background.default,
            display: 'block',
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                marginLeft: 0
            },
            '& .MuiSelect-root': {
                width: '200px'
            }
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

            <Dialog open={isNoTitleDialogOpen} onClose={closeNoTitleDialog} aria-labelledby="Titel darf nicht leer sein.">
                    <DialogTitle><Alert severity="error">Kein Titel</Alert></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bitte gib deinem Rezept einen Titel. Sollte dir keiner so richtig einfallen dann nimm doch einfach
                            den Standardnamen für dein Gericht und füge ein &bdquo;à la&ldquo; und deinen Namen hinzu.
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={closeNoTitleDialog} color="primary" variant="contained" disableElevation>Schließen</Button>
                        </DialogActions>
                    </DialogContent>
            </Dialog>
        </Card>
    )
}