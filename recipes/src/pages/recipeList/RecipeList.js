import React from 'react';
import RecipeCard from './RecipeCard';
import './recipelist.scss';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.recipeCards = [];
        if (this.props.recipes != null) {
            this.recipeCards = this.props.recipes.map((recipe) => <RecipeCard key={recipe.id} title={recipe.title} labels={recipe.labels} description={recipe.description} />);
        }
    }

    render() {
        return(
            <GridList cellHeight="auto" cols={4} spacing={40}>
                {this.recipeCards.map((recipeCard) => (
                    <GridListTile key={recipeCard.key}>
                        {recipeCard}
                    </GridListTile>
                ))}
            </GridList>
        );
    }
}

export default RecipeList;