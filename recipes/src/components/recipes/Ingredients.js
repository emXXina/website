import React from 'react';
import { Typography } from '@material-ui/core';

import './recipes.scss';
import IngredientTable from './IngredientTable';

export default function Ingredients(props) {
    const ingredientsInCategories = props.ingredientsInCategories || [];

    return(
        <div>
            <Typography variant="h4" className="recipeSubtitle" component="h3">Zutaten</Typography>

            { ingredientsInCategories.map((category) => {
                return(
                    <IngredientTable key={category.name} heading={category.name} ingredients={category.ingredients}/>
                )
            })}
        </div>
    );
}