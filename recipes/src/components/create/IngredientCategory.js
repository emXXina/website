import React, { useState } from "react";
import { TextField, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function IngredientCategory(props) {
    const idx = props.idx;
    var ingredientsInCategories = props.ingredientsInCategories;

    const handleChange = (event) => {
        ingredientsInCategories[idx].name = event.target.value;
        props.setIngredientsInCategories(ingredientsInCategories.slice());
    }

    const removeCategory = (idx) => {
        const obsoleteCategory = ingredientsInCategories[idx];
        const mainCategory = ingredientsInCategories.find((category) => category.name === "main")
        if (obsoleteCategory.ingredients !== undefined && mainCategory === undefined) {
            ingredientsInCategories.push({
                name: "main",
                ingredients: obsoleteCategory.ingredients
            });
        } else if (obsoleteCategory.ingredients !== undefined) {
            mainCategory.ingredients = mainCategory.ingredients.concat(obsoleteCategory.ingredients);
        }
        ingredientsInCategories.splice(idx, 1);
        props.setIngredientsInCategories(ingredientsInCategories.slice());
        console.log(ingredientsInCategories);
    }

    return(
        <div className={props.classes.container} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <TextField
                name="name"
                required
                variant="outlined"
                label="Kategoriebezeichnung"
                onChange={handleChange}
                value={ingredientsInCategories[idx].name}
            />
            { ingredientsInCategories.length > 1 &&
                <IconButton onClick={ _ => removeCategory(idx)}>
                    <HighlightOffIcon/>
                </IconButton>
            }
        </div>
    );
}