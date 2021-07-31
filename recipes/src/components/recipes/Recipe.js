import { Card, Typography, CardContent, Divider } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import defaultImg from '../recipesDashboard/default.png';
import defaultImg2 from '../navBar/Muffin_200.png';
import Slider from '../slider/Slider.js';
import Error from '../utils/Error';
import RecipeActionBar from './RecipeActionBar';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

import backend from '../../config/backend';

export default function Recipe() {
    let {id} = useParams();
    
    const [valid, setValid] = useState(true);
    const [recipe, setRecipe] = useState({});
    useEffect(() => {
        fetch(`${backend}/recipe/${id}`).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return setValid(false);
            }
        })
        .then(responseInJson => setRecipe(responseInJson))
    }, [id]);

    const printComp = useRef();

    if (! valid) {
        return(
            <Error message="Rezept nicht gefunden"/>
        )
    } else {    
        let imgs = [defaultImg, defaultImg2, defaultImg, defaultImg2];
        return(
            <Card className="big-card">
                <RecipeActionBar print={printComp}/>
                <Divider variant="fullWidth"/>
                <div ref={printComp}>
                    <CardContent>
                        <Typography variant="h2">{recipe.name}</Typography>
                    </CardContent>
                    <Slider images={imgs}/>
                    <CardContent>
                        <Typography variant="body2">{recipe.description}</Typography>
                    </CardContent>
                    <Divider variant="fullWidth"/>
                    <CardContent>
                        <Ingredients ingredientsInCategories={recipe.ingredientsInCategories}/>
                    </CardContent>
                    <Divider variant="fullWidth"/>
                    <CardContent>
                        <Instructions instructions={recipe.instructions}/>
                    </CardContent>
                </div>
            </Card>
        );
    }
}