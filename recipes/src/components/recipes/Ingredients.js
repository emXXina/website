import React, { useState, useEffect } from 'react';

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
        <ul>
        {
        categories.map((category) => {
            let ingredientsOfCategory = ingredients.get(category.id);
            if (ingredientsOfCategory !== undefined && ingredientsOfCategory.length > 0) {
                return(
                    <li key={category.id}>{category.name}
                        <ul>
                        {
                        ingredientsOfCategory.map((ingredient) => <li key={ingredient.id}>{ingredient.name}</li>)
                        }
                        </ul>
                    </li>
                )
            }
        })
        }
        </ul>
    );
}