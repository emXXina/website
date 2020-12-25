import React from 'react';

import '@material/react-card/dist/card.css';
import defaultImg from './default.jpg';

import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";

import { Button, IconButton } from '@material-ui/core/';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class RecipeCard extends React.Component {
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
    }

    render() {
        return(
            <Card>
                <CardPrimaryContent>
                    <h1>{this.title}</h1>
                    <h2>{this.labels}</h2>
                    <CardMedia square imageUrl={this.img} />
                    <p>
                        {this.description}
                    </p>
                </CardPrimaryContent>

                <CardActions>
                    <CardActionButtons>
                        <Button>Ansehen</Button>
                        <Button>Los geht's!</Button>
                    </CardActionButtons>
                    
                    <CardActionIcons>
                        <IconButton>
                            <FavoriteBorderIcon/>
                        </IconButton>
                        <IconButton>
                            <ShareIcon/>
                        </IconButton>
                    </CardActionIcons>
                </CardActions>
            </Card>
        );
    }
}

export default RecipeCard;