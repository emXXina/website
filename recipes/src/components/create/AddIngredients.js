import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Ingredient from "./Ingredient";
import BasicBigButton from "../utils/BasicBigButton";
import AddIcon from '@material-ui/icons/Add';
import { GridList, GridListTile } from '@material-ui/core';

function AddIngredients() {
    const useStyles = makeStyles({
        tile: {
            marginBottom: '1rem',
        }
    });
    const classes = useStyles();

    // add all available ingredient categories to this state
    const units = ["", "EL", "TL", "ml", "l", "mg", "g", "kg", "Tropfen", "Prise(n)", "Pck", "Scheibe(n)", "Tasse(n)", "Pfund"];
    const [categories, setCategories] = useState(["---", "Teig"]);
    const basicIngredient = {name: '', unit: units[0], quantity: '0', category_name: categories[0]};
    const [ingredients, setIngredients] = useState([basicIngredient]);

    const setIngredient = (idx, attribute, value) => {
        console.log(ingredients);
        console.log(idx);
        console.log(attribute);
        console.log(value);
        ingredients[idx] = {
            ...ingredients[idx],
            [attribute]: value
        };
        setIngredients(ingredients.slice());
    }

    const getIngredient = (idx) => {
        return ingredients[idx];
    }
                                            
    const addIngredient = () => {
        ingredients.push(basicIngredient);
        setIngredients(ingredients.slice());
    };

    const getTiles = () => {
        var tiles = [];
        for (var i = 0; i < ingredients.length; i++) {
            tiles.push(
                <GridListTile key={i} className={classes.tile}>
                    <Ingredient categories={categories} units={units} idx={i} setIngredient={setIngredient} getIngredient={getIngredient}/>
                </GridListTile>
                );
        }
        return tiles;
    };

    return(
        <form>
            <GridList cellHeight="auto" cols={1} spacing={0}>
                {getTiles()}
            </GridList>
            <BasicBigButton icon={<AddIcon/>} action={{onClick: addIngredient}} />
        </form>
    );
}

export default AddIngredients;