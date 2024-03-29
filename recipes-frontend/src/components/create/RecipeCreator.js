import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Typography, CardContent, MobileStepper, Divider, makeStyles, useTheme } from '@material-ui/core';
import AddFundamentals from './AddFundamentals';
import AddIngredientCategories from './AddIngredientCategories';
import AddIngredients from './AddIngredients';
import FinishingPage from './FinishingPage';
import AddInstructions from './AddInstructions';
import Warning from '../utils/Warning';
import isValidRecipe from './inputValidation';

import backend from '../../config/backend';

export default function RecipeCreator() {
    const steps = ['Grundlegende Eigenschaften', 'Zutatenkategorien', 'Zutaten', 'Zubereitung', 'Fertig?' ];
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

    const getAllIngredients = () => {
        var allIngredients = [];
        ingredientsInCategories.forEach((category) => {
            var ingredientsOfThisCategory = category.ingredients;
            ingredientsOfThisCategory.forEach((ingredient) => {
                ingredient.category = category.name;
            })
            allIngredients = allIngredients.concat(ingredientsOfThisCategory);
        })
        return allIngredients;
    }

    /**
     * Insert values for existing recipe
     */
    let { id } = useParams();
    useEffect(() => {
        if (id !== undefined) {
            fetch(`${backend}/recipe/${id}`)
            .then(response => response.json())
            .then(recipe => {
                recipe.instructions.forEach((instruction) => {
                    instruction.template = 0;
                })

                setName(recipe.name);
                setDescription(recipe.description);
                setIngredientsInCategories(recipe.ingredientsInCategories);
                setInstructions(recipe.instructions);
            })
        }
    }, [id])


    /**
     * Methods to control stepper 
     */
    function getContent(step) {
        switch(step) {
            case 0:
                return <AddFundamentals
                            setName={setName}
                            name={name}
                            setDescription={setDescription}
                            description={description} 
                        />;
            case 1:
                return <AddIngredientCategories
                            classes={classes}
                            ingredientsInCategories={ingredientsInCategories}
                            setIngredientsInCategories={setIngredientsInCategories.bind(this)}
                        />;
            case 2:
                return <AddIngredients
                            classes={classes}
                            units={units}
                            ingredientsInCategories={ingredientsInCategories}
                            setIngredientsInCategories={setIngredientsInCategories.bind(this)}
                        />;
            case 3:
                return <AddInstructions
                            classes={classes}
                            templates={instructionTemplates}
                            instructions={instructions}
                            setInstructions={setInstructions.bind(this)}
                            ingredientsInCategories={ingredientsInCategories}
                            getAllIngredients={getAllIngredients.bind(this)}
                        />;
            case 4:
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

    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [warningContent, setWarningContent] = useState({});
    const closeWarning = () => setIsWarningOpen(false)
    const openWarning = (content, callbackForClosing) => {
        setWarningContent(content);
        setIsWarningOpen(true);
    }

    const handleFinish = () => {
        const recipe = {
            name: name,
            description: description,
            ingredientsInCategories: ingredientsInCategories,
            instructions: instructions
        };
        if (!isValidRecipe(recipe, openWarning.bind(this))) {
            return;
        }

        instructions.forEach((instruction) => {
            delete instruction.template;
            delete instruction.state;
        })

        if (id === undefined) {
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

            fetch(`${backend}/recipe`, requestOptions)
            .then(response => response.json())
            .then(data => window.location = `../rezept/${data.id}` )
            .catch(error => console.log(error))
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'name': name,
                    'description': description,
                    'ingredientsInCategories': ingredientsInCategories,
                    'instructions': instructions
                })
            }

            fetch(`${backend}/recipe/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => window.location = `../rezept/${id}` )
            .catch(error => console.log(error))
        }
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
                <Typography variant="h2">{id === undefined ? "Neues Rezept" : "Rezept bearbeiten"}</Typography>
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

            <Warning isOpen={isWarningOpen} close={closeWarning} content={warningContent}/>
        </Card>
    )
}