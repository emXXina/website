import React, {useState, useEffect} from "react";

import AddButton from "./AddButton";
import RecipeList from "./RecipeList";
import RecipeCard from './RecipeCard';
import Error from '../utils/Error';

function RecipeDashboard(props) {
    const [recipes, setRecipes] = useState([]);
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        fetch('/recipes').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setRecipes(jsonRes));
    }, []);

    const [recipeCards, setRecipeCards] = useState([]);
    useEffect(() => {
        if (recipes == null) {
            setConnected(false);
        } else {    
            setRecipeCards(
                recipes.map((recipe) => 
                <RecipeCard key={recipe.id} id={recipe.id} title={recipe.name} />)
            );
            setConnected(true);
        }
    }, [recipes]);

    if (connected) {
        return(
            <div>
                <RecipeList recipeCards={recipeCards} />
                <AddButton path="/create"/>
            </div>
        );
    } else {
        return(
            <Error message="Rezepte konnten nicht geladen werden."/>
        );
    }
}

export default RecipeDashboard;