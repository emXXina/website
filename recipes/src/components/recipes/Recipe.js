import { Card, Typography, CardContent, IconButton, Button, Divider, CardActions } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import defaultImg from '../recipeList/default.jpg';
import defaultImg2 from '../navBar/Muffin_200.png';
import Slider from '../slider/Slider.js';
import Error from '../messages/Error';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
            <Card className="big-card">
                <CardActions className="card__actions">
                    <div>
                        <IconButton color="primary" href="/">
                            <NavigateBeforeIcon/>
                        </IconButton>
                    </div>
                    <div>
                        <Button color="primary" variant="outlined">
                            Drucken
                        </Button>
                        <IconButton aria-label="Teilen">
                            <ShareIcon/>
                        </IconButton>
                        <IconButton aria-label="Liken">
                            <FavoriteIcon/>
                        </IconButton>
                    </div>
                </CardActions>
                <Divider variant="fullWidth"/>
                <CardContent>
                    <Typography variant="h2">{recipe.name}</Typography>
                    <Typography variant="body1">Labels</Typography>
                </CardContent>
                <Slider images={imgs}/>
                <CardContent>
                    <Typography variant="body2">{recipe.description}</Typography>
                </CardContent>
            </Card>
        );
    }
}