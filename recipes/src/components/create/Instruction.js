import React from 'react';
import { TextField, MenuItem, IconButton, useTheme, makeStyles } from '@material-ui/core';
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

    const getInstruction = () => {return props.getInstruction(props.idx)};

    const getTemplateName = (template) => {
        switch(template) {
            case 0: return "Freie Eingabe";
            case 1: return "Mischen";
            default: throw new Error("Invalid template (Nr 1).");
        }
    }

    const initializeState = (template) => {
        switch(template) {
            case 0:
                props.setInstruction(props.idx, "state", []);
                break;
            case 1:
                props.setInstruction(props.idx, "state", [props.getIngredients()[0].name]);
                break;
            default:
                throw new Error("Invalid template (Nr 2).");
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
                    onChange={event => props.setInstruction(props.idx, "text", event.target.value)}
                    value={getInstruction().text}
                />;
            case 1:
                return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                    {getInstruction().state.map((toBeMixedIngredient, idx) => {
                        return <TextField
                        name="ingredients"
                        select
                        variant="outlined"
                        label="Zutat"
                        key={idx}
                        onChange={event => {
                            console.log(getInstruction().state);
                            const newState = getInstruction().state;
                            newState[idx] = event.target.value;
                            props.setInstruction(props.idx, "state", newState);
                            console.log(getInstruction().state);
                        }}
                        value={toBeMixedIngredient} 
                        >
                            {props.getIngredients().map((ingredient, idx) => (
                                <MenuItem value={ingredient.name} key={idx}>{ingredient.name}</MenuItem>
                            ))}
                        </TextField>;
                    })}
                    <IconButton onClick={handleAddButton} className={classes.icon}>
                        <AddIcon fontSize="small"/>
                    </IconButton>
                </div>;
            default:
                throw new Error("Invalid template (Nr 3).")
        }
    }

    const handleAddButton = () => {
        switch(getInstruction().template) {
            case 0:
                throw new Error("Can not handle add button for " + getTemplateName(getInstruction().template));
            case 1:
                console.log(getInstruction().state);
                var newState = getInstruction().state;
                newState.push(props.getIngredients()[0].name);
                props.setInstruction(props.idx, "state", newState);
                console.log(getInstruction().state);
                break;
            default:
                throw new Error("Invalid template (Nr 4): " + getInstruction().template);                
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
                    onChange={event => {
                        props.setInstruction(props.idx, event.target.name, event.target.value);
                        initializeState(event.target.value);
                    }}
                    value={getInstruction().template}
                >
                    {props.templates.map((template, idx) => (
                        <MenuItem value={template} key={idx}>{getTemplateName(template)}</MenuItem>
                    ))} 
                </TextField>                
                { (props.getInstructions().length > 1) &&
                    <IconButton onClick={event => props.removeInstruction(props.idx)}>
                        <HighlightOffIcon/>
                    </IconButton>
                }    
            </div>
            {getContent(getInstruction().template)}
        </div>
    );
}