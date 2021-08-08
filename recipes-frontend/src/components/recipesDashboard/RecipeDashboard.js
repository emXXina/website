import React, {useState, useEffect} from "react";

import RecipeList from "./RecipeList";
import RecipeCard from './RecipeCard';
import Error from '../utils/Error';
import BasicBigButton from '../utils/BasicBigButton';
import PostAddIcon from '@material-ui/icons/PostAdd';

import backend from '../../config/backend';

function RecipeDashboard(props) {
    const [recipes, setRecipes] = useState([]);
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        fetch(`${backend}/recipe`).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(jsonRes => setRecipes(jsonRes))
        .catch(error => setConnected(false))
    }, []);

    const [recipeCards, setRecipeCards] = useState([]);
    useEffect(() => {
        if (recipes == null) {
            setConnected(false);
        } else {    
            setRecipeCards(
                recipes.map((recipe) => 
                <RecipeCard key={recipe._id} id={recipe._id} title={recipe.name} />)
            );
            setConnected(true);
        }
    }, [recipes]);

    if (connected) {
        return(
            <div>
                <RecipeList recipeCards={recipeCards} />
                <BasicBigButton hover icon={<PostAddIcon fontSize="large" color="secondary" />} action={{href: "/create"}}/>
            </div>
        );
    } else {
        return(
            <Error message="Rezepte konnten nicht geladen werden."/>
        );
    }
}

export default RecipeDashboard;