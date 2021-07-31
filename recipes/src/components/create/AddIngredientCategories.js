import React, { useState } from "react";
import IngredientCategory from "./IngredientCategory";
import BasicBigButton from "../utils/BasicBigButton";
import AddIcon from '@material-ui/icons/Add';
import { GridList, GridListTile, Typography } from '@material-ui/core';

function AddIngredients(props) {
    const ingredientsInCategories = props.ingredientsInCategories;
    const classes = props.classes;

    const getCategoryTiles = () => {
        var tiles = [];
        ingredientsInCategories.map((category, idx) => {
            tiles.push(
                <GridListTile key={idx} className={classes.tile}>
                    <IngredientCategory
                        idx={idx}
                        ingredientsInCategories={ingredientsInCategories}
                        classes={classes}
                        setIngredientsInCategories={props.setIngredientsInCategories}
                    />
                </GridListTile>
            )
        });
        return tiles;
    }

    const addCategory = () => {
        ingredientsInCategories.push({ name: "" });
        props.setIngredientsInCategories(ingredientsInCategories.slice());
        console.log(ingredientsInCategories);
    }

    return(
        <form>
            <Typography paragraph>
                Wenn du möchtest, kannst du deine Zutaten in Kategorien aufteilen wie zum Beispiel "Teig" und
                "Belag". Solltest du das nicht brauchen, dann lass die Zutatenkategorie bei deinen Zutaten einfach
                bei "main".
            </Typography>
            <GridList cellHeight="auto" cols={1} spacing={0}>
                {getCategoryTiles()}
            </GridList>
            <BasicBigButton icon={<AddIcon/>} action={{onClick: addCategory}}/>
        </form>
    );
}

export default AddIngredients;