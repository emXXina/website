import { Card, Typography, CardContent, Divider } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import defaultImg from '../recipesDashboard/default.jpg';
import defaultImg2 from '../navBar/Muffin_200.png';
import Slider from '../slider/Slider.js';
import Error from '../utils/Error';
import RecipeActionBar from './RecipeActionBar';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

export default function Recipe(props) {
    let {id} = useParams();
    
    const [valid, setValid] = useState(true);
    const [recipe, setRecipe] = useState({});
    useEffect(() => {
        fetch(`/recipes/${id}`).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return setValid(false);
            }
        }).then(jsonRes => setRecipe(jsonRes));
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
                        <Ingredients id={id}/>
                    </CardContent>
                    <Divider variant="fullWidth"/>
                    <CardContent>
                        <Instructions id={id}/>
                    </CardContent>
                </div>
            </Card>
        );
    }
}