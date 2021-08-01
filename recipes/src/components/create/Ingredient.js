import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, IconButton } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function Ingredient(props) {
    const useStyles = makeStyles({
        numberInput: {
            width: '7rem',
        }
    })
    const classes = useStyles();

    const idx = props.idx;
    const [isQuantityValid, setIsQuantityValid] = useState(true);

    const update = () => props.setIngredientsInCategories(props.ingredientsInCategories.slice());

    const handleNameChange = (event) => {
        props.ingredient.name = event.target.value;
        update();
    }

    const handleCategoryChange = (event) => {
        const ingredientsOldCategory = props.ingredientsInCategories.find((category) => category.name == props.ingredient.category);
        const ingredientsNewCategory = props.ingredientsInCategories.find((category) => category.name == event.target.value);
        ingredientsOldCategory.ingredients.splice(idx, 1);
        ingredientsNewCategory.ingredients.push(props.ingredient);
        update();
    }

    const handleQuantityChange = (event) => {
        if (event.target.value < 0) {
            setIsQuantityValid(false);
        } else {
            props.ingredient.quantity = event.target.value;
            update();
            setIsQuantityValid(true);
        }
    }

    const handleUnitChange = (event) => {
        props.ingredient.unit = event.target.value;
        update();
    }

    const removeIngredient = () => {
        const ingredientsCategory = props.ingredientsInCategories.find((category) => category.name === props.ingredient.category);
        ingredientsCategory.ingredients.splice(idx, 1);
        update();        
    }

    return(
        <div className={props.classes.container}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <TextField
                    name="name"
                    required
                    variant="outlined"
                    label="Zutatenbezeichnung"
                    onChange={handleNameChange}
                    value={props.ingredient.name}
                />
                <IconButton onClick={removeIngredient}>
                    <HighlightOffIcon/>
                </IconButton>
            </div>
            <TextField
                name="category_name"
                select
                variant="outlined"
                label="Zutatenkategorie"
                onChange={handleCategoryChange}
                value={props.ingredient.category}
            >
                {props.ingredientsInCategories.map((category, idx) => (
                    <MenuItem value={category.name} key={idx}>{category.name}</MenuItem>
                ))} 
            </TextField><br/>
            <TextField className={classes.numberInput}
                error={!isQuantityValid}
                helperText={isQuantityValid ? "" : "Die Menge muss positiv sein."}
                type="number"
                name="quantity"
                variant="outlined"
                label="Menge"
                onChange={handleQuantityChange}
                value={props.ingredient.quantity}
            />
            <TextField
                name="unit"
                select
                variant="outlined"
                label="Einheit"
                onChange={handleUnitChange}
                value={props.ingredient.unit}
            >
                {props.units.map((unit, idx) => (
                    <MenuItem value={unit} key={idx}>{unit}</MenuItem>
                ))}
            </TextField>
        </div>
    );
}