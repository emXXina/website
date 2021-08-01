import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BasicBigButton from '../utils/BasicBigButton';
import Instruction from './Instruction';

export default function AddInstructions(props) {
    const addInstruction = () => {
        props.instructions.push({
            template: props.templates[0],
            text: "",
            state: ""
        });
        props.setInstructions(props.instructions.slice());
    }

    return(
        <form>
            <GridList cellHeight="auto" cols={1} spacing={0}>
                {props.instructions.map((instruction, idx) => (
                    <GridListTile key={idx} className={props.classes.tile}>
                        <Instruction
                            idx={idx}
                            classes={props.classes}
                            templates={props.templates}
                            instructions={props.instructions}
                            setInstructions={props.setInstructions}      
                            ingredientsInCategories={props.ingredientsInCategories}            
                            getAllIngredients={props.getAllIngredients}          
                        />
                    </GridListTile>
                ))}
            </GridList>
            <BasicBigButton icon={<AddIcon/>} action={{onClick: addInstruction}} />
        </form>
    );
}