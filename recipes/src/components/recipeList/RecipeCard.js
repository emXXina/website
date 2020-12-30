import React from 'react';

import '@material/react-card/dist/card.css';
import "./recipecard.scss";
import defaultImg from './default.jpg';

import { Card, CardMedia, CardContent, CardActionArea, CardActions, Typography } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core/';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import { Link } from 'react-router-dom';

class RecipeCard extends React.Component {
    state = {
        hoverPlay: false
    };

    constructor(props) {
        super(props);
        
        this.title = (this.props.title == null) ? "Ohne Titel" : this.props.title;
        this.labels = (this.props.labels == null) ? "Keine Label" : this.props.labels;
        this.img = (this.props.img == null) ? defaultImg : this.props.img;
        this.description = (this.props.description == null) ? "Keine Beschreibung" : this.props.description;
        this.id = (this.props.id == null) ? "404" : this.props.id;
    
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
    }

    handleTogglePlay = () => this.setState({ hoverPlay: !this.state.hoverPlay });

    render() {
        return(
            <Card raised className="card">
                <Link to={'/rezept/' + this.id}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h4" component="h2">{this.title}</Typography>
                            <Typography variant="body1">{this.labels}</Typography>
                        </CardContent>
                        <CardMedia image={this.img} title="Bild vom Rezept" className="media" />
                        <CardContent>
                            <Typography variant="body2">{this.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>

                <CardActions className="card__actions">
                    <div>
                        <Link to={'/rezept/' + this.id}>
                            <Button color="primary" variant="contained">
                                Rezept
                            </Button></Link>
                        <IconButton
                            aria-label="Rezept starten"
                            onMouseEnter = {this.handleTogglePlay}
                            onMouseLeave = {this.handleTogglePlay}
                        >
                            {this.state.hoverPlay ? <PlayCircleFilledIcon /> : <PlayCircleOutlineIcon />}
                        </IconButton>  
                    </div>     
                    <div>
                        <IconButton aria-label="Teilen">
                            <ShareIcon/>
                        </IconButton>
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