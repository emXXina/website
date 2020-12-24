import React from 'react';

import './recipecard.scss';
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";
import defaultImg from './default.jpg';


class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.title = "";
        (this.props.title == null) ? this.title = "Kein Titel" : this.title = this.props.title;

        this.label = "";
        (this.props.label == null) ? this.label = "Kein Label" : this.label = this.props.label;

        this.description = "";
        (this.props.description == null) ? this.description = "Keine Beschreibung" : this.description = this.props.description;
    }
    
    render() {
        return(
            <Card className="mdc-card demo-card demo-basic-with-header my-card">
                <div className="demo-card__primary">
                    <h1>{this.title}</h1>
                    <h2>{this.label}</h2>
                </div>
                <CardPrimaryContent className="demo-card__primary-action">
                    <img src={defaultImg} />
                    {this.description}
                </CardPrimaryContent>
                <div>
                    actions: angucken, starten, liken, teilen
                </div>

            </Card>
        );
    }
}

export default RecipeCard;