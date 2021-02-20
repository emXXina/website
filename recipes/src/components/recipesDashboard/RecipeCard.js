import React from 'react';

import '@material/react-card/dist/card.css';
import "./recipecard.scss";
import defaultImg from './default.png';

import { Card, CardMedia, CardContent, CardActionArea, CardActions, Typography } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Share from '../utils/Share';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

class RecipeCard extends React.Component {
    state = {
        hoverPlay: false
    };

    constructor(props) {
        super(props);
        
        this.title = (this.props.title == null) ? "Ohne Titel" : this.props.title;
        this.img = (this.props.img == null) ? defaultImg : this.props.img;
        this.id = (this.props.id == null) ? "404" : this.props.id;
    
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
    }

    handleTogglePlay = () => this.setState({ hoverPlay: !this.state.hoverPlay });

    render() {
        return(
            <Card raised className="card">
                <CardActionArea href={'/rezept/' + this.id}>
                    <CardContent>
                        <Typography variant="h4" component="h2">{this.title}</Typography>
                    </CardContent>
                    <CardMedia image={this.img} title="Bild vom Rezept" className="media" />
                </CardActionArea>

                <CardActions className="card__actions">
                    <div>
                        <Button color="primary" variant="contained" href={'/rezept/' + this.id}>
                            Rezept
                        </Button>
                        <IconButton
                            aria-label="Rezept starten"
                            onMouseEnter = {this.handleTogglePlay}
                            onMouseLeave = {this.handleTogglePlay}
                        >
                            {this.state.hoverPlay ? <PlayCircleFilledIcon /> : <PlayCircleOutlineIcon />}
                        </IconButton>  
                    </div>     
                    <div>
                        <Share link={`${window.location.href}rezept/${this.id}`}/>
                        <IconButton aria-label="Liken">
                            <FavoriteIcon/>
                        </IconButton>   
                    </div>
                </CardActions>
            </Card>
        );
    }
}

export default RecipeCard;