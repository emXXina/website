import { Card, Typography, CardContent } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import defaultImg from '../recipeList/default.jpg';
import defaultImg2 from '../navBar/Muffin_200.png';
import Slider from '../slider/Slider.js';
import Error from '../messages/Error';

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
    }, []);



    console.log(id);
    if (! valid) {
        return(
            <Error message="Rezept nicht gefunden"/>
        )
    } else {    
        let imgs = [defaultImg, defaultImg2, defaultImg, defaultImg2];
    
        return(
            <Card className="card">
                <CardContent>
                    <Typography variant="h2">{recipe.name}</Typography>
                    <Typography variant="body1">Labels</Typography>
                    <Slider images={imgs}/>
                    <Typography variant="body2">{recipe.description}</Typography>
                </CardContent>
            </Card>
        );
    }
}