import { Card, Typography, CardContent, CardMedia } from '@material-ui/core';
import React from 'react';
import {useParams} from 'react-router-dom';
import defaultImg from '../recipeList/default.jpg';

export default function Recipe(props) {
    let {id} = useParams(); // 404 is recipe not found
    let recipeInfo = props.recipes.filter(recipe => recipe.id == id)[0];

    return(
        <Card>
            <CardContent>
                <Typography variant="h2">{recipeInfo.title}</Typography>
                <Typography variant="body1">Labels</Typography>
            </CardContent>
            <CardMedia image={defaultImg} title="Bild vom Rezept" className="media" />
            <CardContent>
                <Typography variant="body2">{recipeInfo.description}</Typography>
            </CardContent>
        </Card>
    );
}