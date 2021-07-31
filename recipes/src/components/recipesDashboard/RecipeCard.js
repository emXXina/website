import React, {useState} from 'react';

import '@material/react-card/dist/card.css';
import "./recipecard.scss";
import defaultImg from './default.png';

import { Card, CardMedia, CardContent, CardActionArea, CardActions, Typography } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Share from '../utils/Share';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

export default function RecipeCard(props) {
    const title = (props.title == null || props.title === "") ? "Ohne Titel" : props.title;
    const img = (props.img == null) ? defaultImg : props.img;
    const id = (props.id == null) ? "404" : props.id;

    const [hoverPlay, setHoverPlay] = useState(false);
    const handleTogglePlay = () => setHoverPlay(! hoverPlay);

    const [hoverFavorite, setHoverFavorite] = useState(false);
    const handleToggleFavorite = () => setHoverFavorite(! hoverFavorite);

    return(
        <Card raised className="card">
            <CardActionArea href={'/rezept/' + id}>
                <CardContent>
                    <Typography variant="h5" component="h2">{title}</Typography>
                </CardContent>
                <CardMedia image={img} title="Bild vom Rezept" className="media" />
            </CardActionArea>

            <CardActions className="card__actions">
                <div>
                    <Button color="primary" variant="contained" href={'/rezept/' + id}>
                        Rezept
                    </Button>
                    <IconButton
                        aria-label="Rezept starten"
                        onMouseEnter = {handleTogglePlay}
                        onMouseLeave = {handleTogglePlay}
                    >
                        {hoverPlay ? <PlayCircleFilledIcon color="secondary" /> : <PlayCircleOutlineIcon />}
                    </IconButton>  
                </div>     
                <div>
                    <Share
                        link={`${window.location.href}rezept/${id}`}
                    />
                    <IconButton 
                        aria-label="Liken"
                        onMouseEnter = {handleToggleFavorite}
                        onMouseLeave = {handleToggleFavorite}>
                        <FavoriteIcon color={hoverFavorite ? "secondary" : "inherit"} />
                    </IconButton>   
                </div>
            </CardActions>
        </Card>
    );
}