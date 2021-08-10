import React from "react";
import Ingredient from "./Ingredient";
import BasicBigButton from "../utils/BasicBigButton";
import AddIcon from '@material-ui/icons/Add';
import { GridList, GridListTile, Typography } from '@material-ui/core';

function AddIngredients(props) {
    const addIngredientTo = (category) => {
        category.ingredients.push({
            name: "", 
            unit: props.units[0],
            quantity: 0 
        })
        props.setIngredientsInCategories(props.ingredientsInCategories.slice());
    }


    return(
        <form>
            <Typography paragraph>
                Soll eine Zutat einfach nach Belieben hinzugefügt werden oder du möchtest aus einem anderen Grund
                keine Menge angeben, dann gibt einfach eine Menge von 0 aus.
            </Typography>
            {props.ingredientsInCategories.map((category, categoryIdx) => (
                <div key={categoryIdx}>
                    <Typography variant="h5" component="h4" paragraph>{category.name}</Typography>
                    <GridList cellHeight="auto" cols={1} spacing={0}>
                        {category.ingredients.map((ingredient, ingredientIdx) => {
                            ingredient.category = category.name;
                            return(
                                <GridListTile key={ingredientIdx} className={props.classes.tile}>
                                    <Ingredient 
                                        idx={ingredientIdx}
                                        classes={props.classes}
                                        units={props.units}
                                        ingredientsInCategories={props.ingredientsInCategories}    
                                        setIngredientsInCategories={props.setIngredientsInCategories}                
                                        ingredient={ingredient}        
                                    />
                                </GridListTile>
                            )
                        })}
                    </GridList>
                    <BasicBigButton icon={<AddIcon/>} action={{onClick: () => addIngredientTo(category)}} />
                </div>
            ))}
        </form>
    );
}

export default AddIngredients;