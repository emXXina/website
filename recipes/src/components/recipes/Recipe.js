import { Card, Typography, CardContent } from '@material-ui/core';
import React from 'react';
import {useParams} from 'react-router-dom';
import defaultImg from '../recipeList/default.jpg';
import defaultImg2 from '../navBar/Muffin_200.png';
import Slider from '../slider/Slider.js';

export default function Recipe(props) {
    let {id} = useParams(); // 404 is recipe not found
    let recipeInfo = props.recipes.filter(recipe => recipe.id === id)[0];

    console.log(id);
    if (recipeInfo == null) {
        return(
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h2" color="error">Fehler</Typography>
                    <Typography variant="body1">Rezept nicht gefunden</Typography>
                </CardContent>
            </Card>
        )
    } else {    
        let imgs = [defaultImg, defaultImg2, defaultImg, defaultImg2];
    
        return(
            <Card>
                <CardContent>
                    <Typography variant="h2">{recipeInfo.title}</Typography>
                    <Typography variant="body1">Labels</Typography>
                    <Slider images={imgs}/>
                    <Typography variant="body2">{recipeInfo.description}</Typography>
                </CardContent>
            </Card>
        );
    }
}