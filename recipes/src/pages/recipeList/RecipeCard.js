import React from 'react';

import '@material/react-card/dist/card.css';
import "./recipecard.scss";
import defaultImg from './default.jpg';

import { Card, CardHeader, CardMedia, CardContent, CardActionArea, CardActions, Typography} from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core/';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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
    
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
    }

    handleTogglePlay = () => this.setState({ hoverPlay: !this.state.hoverPlay });

    render() {
        return(
            <Card variant="outlined" >
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h4" component="h2">{this.title}</Typography>
                        <Typography variant="h6">{this.labels}</Typography>
                    </CardContent>
                    <CardMedia image={this.img} title="Test" className="media" />
                    <CardContent>
                        <Typography variant="body2">{this.description}</Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions className="card__actions">
                    <div>
                        <Button color="primary" variant="outlined">
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