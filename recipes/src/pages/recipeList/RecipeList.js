import React from 'react';
import RecipeCard from './RecipeCard';
import './recipelist.scss';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.recipeCards = [];
        if (this.props.recipes != null) {
            this.recipeCards = this.props.recipes.map((recipe) => <RecipeCard title={recipe.title} labels={recipe.labels} description={recipe.description} />);
        }
    }

    render() {
        return(
            <div class="list">
                {this.recipeCards}
            </div>
        );
    }
}

export default RecipeList;