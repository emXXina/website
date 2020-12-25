import React from 'react';

import '@material/react-card/dist/card.css';
import "./recipecard.scss";
import defaultImg from './default.jpg';

import { Card, CardHeader, CardMedia, CardContent, CardActionArea, CardActions} from '@material-ui/core';
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
        
        this.title = "";
        (this.props.title == null) ? this.title = "Ohne Titel" : this.title = this.props.title;

        this.labels = "";
        (this.props.labels == null) ? this.labels = "Keine Label" : this.labels = this.props.labels;

        this.img = "";
        (this.props.img == null) ? this.img = defaultImg : this.img = this.props.img;

        this.description = "";
        (this.props.description == null) ? this.description = "Keine Beschreibung" : this.description = this.props.description;
    
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
    }

    handleTogglePlay = () => this.setState({ hoverPlay: !this.state.hoverPlay });

    render() {
        return(
            <Card variant="outlined" >
                <CardActionArea>
                    <CardHeader title={this.title} subheader={this.labels}/>
                    <CardMedia image={this.img} title="Test" className="media" />
                    <CardContent>
                        <p>{this.description}</p>
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