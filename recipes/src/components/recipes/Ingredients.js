import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import './recipes.scss';
import IngredientTable from './IngredientTable';

export default function Ingredients(props) {
    const id = props.id;

    // update categories
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`/ingredient_categories/givenRecipe/${id}`).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setCategories(jsonRes));
    }, [id]);

    // update ingredients
    const [ingredients, setIngredients] = useState(new Map());
    useEffect(() => {
        categories.forEach( (category) =>
            fetch(`/ingredients/givenCategory/${category.id}`).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(jsonRes => {
                ingredients.set(category.id, jsonRes);
                setIngredients(new Map(ingredients));
            })
        )
    }, [categories]);

    return(
        <div>
            <Typography variant="h4" className="recipeSubtitle" component="h3">Zutaten</Typography>

            { categories.map((category) => {
                let ingredientsOfCategory = ingredients.get(category.id);
                if (ingredientsOfCategory !== undefined && ingredientsOfCategory.length > 0) {
                    return(
                        <IngredientTable key={category.id} heading={category.name} ingredients={ingredientsOfCategory}/>
                    )
                } else {
                    return(<div key={category.id}></div>);
                }
            })}
        </div>
    );
}