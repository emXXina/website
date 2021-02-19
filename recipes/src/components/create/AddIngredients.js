import React from "react";
import Ingredient from "./Ingredient";
import BasicBigButton from "../utils/BasicBigButton";
import AddIcon from '@material-ui/icons/Add';
import { GridList, GridListTile } from '@material-ui/core';

function AddIngredients(props) {
    const getIngredientTiles = () => {
        var tiles = [];
        for (var i = 0; i < props.getIngredients().length; i++) {
            tiles.push(
                <GridListTile key={i} className={props.classes.tile}>
                    <Ingredient 
                        units={props.units}
                        idx={i}
                        setIngredient={props.setIngredient}
                        getIngredient={props.getIngredient}
                        getIngredients={props.getIngredients}
                        classes={props.classes}
                        getCategories={props.getCategories}
                        removeIngredient={props.removeIngredient}
                    />
                </GridListTile>
                );
        }
        return tiles;
    };

    return(
        <form>
            <GridList cellHeight="auto" cols={1} spacing={0}>
                {getIngredientTiles()}
            </GridList>
            <BasicBigButton icon={<AddIcon/>} action={{onClick: props.addIngredient}} />
        </form>
    );
}

export default AddIngredients;