import React from "react";
import Ingredient from "./Ingredient";
import BasicBigButton from "../utils/BasicBigButton";
import AddIcon from '@material-ui/icons/Add';
import { GridList, GridListTile, Typography } from '@material-ui/core';

function AddIngredients(props) {
    const addIngredient = () => {
        const allIngredients = props.getAllIngredients();
        const categoryOfLastIngredientName = allIngredients[allIngredients.length -1].category;
        console.log(categoryOfLastIngredientName);
        const categoryOfLastIngredient = props.ingredientsInCategories.find((category) => category.name === categoryOfLastIngredientName);
        categoryOfLastIngredient.ingredients.push({
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
            <GridList cellHeight="auto" cols={1} spacing={0}>
                {props.getAllIngredients().map((ingredient, idx) => (
                    <GridListTile key={idx} className={props.classes.tile}>
                        <Ingredient 
                            idx={idx}
                            classes={props.classes}
                            units={props.units}
                            ingredientsInCategories={props.ingredientsInCategories}    
                            setIngredientsInCategories={props.setIngredientsInCategories}                
                            ingredient={ingredient}        
                        />
                    </GridListTile>
                ))}
            </GridList>
            <BasicBigButton icon={<AddIcon/>} action={{onClick: addIngredient}} />
        </form>
    );
}

export default AddIngredients;