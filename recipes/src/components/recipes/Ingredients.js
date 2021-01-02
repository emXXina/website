import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import './recipes.scss';

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
                console.log(category.id, " : ", ingredients);
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
                        <div key={category.id}>
                            {category.name == "main" || <Typography variant="subtitle1">{category.name}</Typography>}
                            <ul>
                                { ingredientsOfCategory.map((ingredient) => 
                                    <li key={ingredient.id}>
                                        <Typography>{ingredient.quantity + "\u2009" + ingredient.unit + " " + ingredient.name}</Typography>
                                    </li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                } else {
                    return(<div key={category.id}></div>);
                }
            })
            }
        </div>
    );
}