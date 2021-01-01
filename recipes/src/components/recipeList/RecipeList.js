import React, {useState, useEffect} from 'react';
import RecipeCard from './RecipeCard';
import Error from '../messages/Error';
import './recipelist.scss';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function RecipeList(props) {
    const [recipes, setRecipes] = useState([]);
    const [successful, setSuccessful] = useState(false);
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
            setSuccessful(false);
        } else {
            setRecipeCards(
                recipes.map((recipe) => 
                <RecipeCard key={recipe.id} id={recipe.id} title={recipe.name} />)
            );
            setSuccessful(true);
        }
    }, [recipes]);

    const theme = useTheme();
    const isTiny = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme.breakpoints.only('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.only('md'));
    const isLarge = useMediaQuery(theme.breakpoints.only('lg'));
    const isHuge = useMediaQuery(theme.breakpoints.only('xl'));

    const calcColNum = (() => {
        if (isTiny) {
            return 1;
        } else if (isSmall) {
            return 2;
        } else if (isMedium) {
            return 3;
        } else if (isLarge) {
            return 4;
        } else if (isHuge) {
            return 5;
        }
    })

    if (successful) {
        return(
            <GridList cellHeight="auto" cols={calcColNum()} spacing={0}>
                {recipeCards.map((recipeCard) => (
                    <GridListTile key={recipeCard.key}>
                        {recipeCard}
                    </GridListTile>
                ))}
            </GridList>
        );
    } else {
        return(
            <Error message="Rezepte konnten nicht geladen werden."/>
        );
    }
}

export default RecipeList;