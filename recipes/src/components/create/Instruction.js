import React from 'react';
import { TextField, MenuItem, IconButton, useTheme, makeStyles, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function Instruction(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        icon: {
            '&:hover': {
                color: theme.palette.secondary.main,
            }
        }
    });
    const classes = useStyles();

    const idx = props.idx;
    const update = () => props.setInstructions(props.instructions.slice());

    const getInstruction = () => props.instructions[idx];
    const removeInstruction = () => {
        props.instructions.splice(idx, 1);
        update();
    }

    const getTemplateName = (template) => {
        switch(template) {
            case 0: return "Freie Eingabe";
            case 1: return "Mischen";
            default: throw new Error("Invalid template (Nr 1).");
        }
    }

    const initializeState = (template) => {
        var instruction = getInstruction();
        switch(template) {
            case 0:
                instruction.state = "";
                break;
            case 1:
                instruction.state = [props.getAllIngredients()[0].name, props.getAllIngredients()[0].name];
                instruction.text = getText();
                break;
            default:
                throw new Error("Invalid template (Nr 2).");
        }
    }

    const getText = () => {
        const state = getInstruction().state;
        switch(getInstruction().template) {
            case 0:
                return state;
            case 1: 
                var text = "Mische "
                for (var i = 0; i < state.length - 2; i++) {
                    text += state[i] + ", ";
                }
                text += state[state.length - 2] + " und " + state[state.length - 1] + ".";
                return text;
            default:
                throw new Error("Invalid template (Nr 6): " + getInstruction().template);
        }
    }

    const handleAddButton = () => {
        switch(getInstruction().template) {
            case 0:
                throw new Error("Can not handle add button for " + getTemplateName(getInstruction().template));
            case 1:
                var newState = getInstruction().state;
                newState.push(props.getAllIngredients()[0].name);
                getInstruction().state = newState;
                update();
                break;
            default:
                throw new Error("Invalid template (Nr 4): " + getInstruction().template);                
        }
    }

    const getContent = (template) => {
        switch(template) {
            case 0:
                return <TextField
                    fullWidth
                    multiline
                    name="text"
                    variant="outlined"
                    label="Zubereitungsschritt"
                    value={getInstruction().text}
                    onChange={(event) => {
                        getInstruction().state = event.target.value;
                        getInstruction().text = event.target.value;
                        update();
                    }}
                />;
            case 1:
                return <div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                        {getInstruction().state.map((toBeMixedIngredient, idx) => {
                            return <div>
                                    <TextField
                                        name="ingredients"
                                        select
                                        variant="outlined"
                                        label="Zutat"
                                        key={idx}
                                        value={toBeMixedIngredient} 
                                        onChange={event => {
                                            var newState = getInstruction().state;
                                            newState[idx] = event.target.value;
                                            getInstruction().state = newState;
                                            getInstruction().text = getText(newState);
                                            update();
                                        }}
                                        >
                                            {props.getAllIngredients().map((ingredient, idx) => (
                                                <MenuItem value={ingredient.name} key={idx}>{ingredient.name}</MenuItem>
                                            ))}
                                    </TextField>                
                                    { (getInstruction().state.length > 2) &&
                                        <IconButton onClick={event => {
                                            getInstruction().state.splice(idx, 1);
                                            update();
                                        }}>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                    }                                 
                                </div>;
                        })}
                        <IconButton onClick={handleAddButton} className={classes.icon}>
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </div>
                    <Typography>{getInstruction().text}</Typography> 
                </div>;
            default:
                throw new Error("Invalid template (Nr 3).")
        }
    }

    return(
        <div className={props.classes.container}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <TextField
                    name="template"
                    select
                    variant="outlined"
                    label="Vorlage"
                    value={getInstruction().template}
                    onChange={event => {
                        getInstruction().template = event.target.value;
                        initializeState(event.target.value);
                        update();
                    }}
                >
                    {props.templates.map((template, idx) => (
                        <MenuItem value={template} key={idx}>{getTemplateName(template)}</MenuItem>
                    ))} 
                </TextField>                
                <IconButton onClick={event => removeInstruction()}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>
            {getContent(getInstruction().template)}
        </div>
    );
}