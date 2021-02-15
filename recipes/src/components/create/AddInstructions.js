import React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import BasicBigButton from '../utils/BasicBigButton';
import Instruction from './Instruction';

export default function AddInstructions(props) {
    const getInstructionTiles = () => {
        var tiles = [];
        for (var i = 0; i < props.getInstructions().length; i++) {
            tiles.push(
                <GridListTile key={i} className={props.classes.tile}>
                    <Instruction
                        idx={i}
                        classes={props.classes}
                        setInstruction={props.setInstruction}
                        getInstruction={props.getInstruction}
                        getInstructions={props.getInstructions}
                        removeInstruction={props.removeInstruction}
                        templates={props.templates}
                        getIngredients={props.getIngredients}
                        
                    />
                </GridListTile>
                );
        }
        return tiles;
    };

    return(
        <form>
            <GridList cellHeight="auto" cols={1} spacing={0}>
                {getInstructionTiles()}
            </GridList>
            <BasicBigButton icon={<AddIcon/>} action={{onClick: props.addInstruction}} />
        </form>
    );
}