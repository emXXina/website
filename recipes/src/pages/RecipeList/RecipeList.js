import React from 'react';
import RecipeCard from './RecipeCard';
import './recipeList.scss';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="list">
                <RecipeCard title="Titel" />
            </div>
        );
    }
}

export default RecipeList;