import React, { useState } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MenuItem, TextField } from "@material-ui/core";

export default function Ingredient(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        numberInput: {
            width: '7rem',
        }
    })
    const classes = useStyles();

    const idx = props.idx;
    const [isQuantityValid, setIsQuantityValid] = useState(true);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "quantity" && value < 0) {
            setIsQuantityValid(false);
        } else {
            props.setIngredient(idx, name, value);

            if (name === "quantity") {
                setIsQuantityValid(true);
            }
        }
    }

    return(
        <div className={props.classes.container}>
            <TextField
                name="name"
                required
                variant="outlined"
                label="Zutatenbezeichnung"
                onChange={handleChange}
                value={props.getIngredient(idx).name}
            /><br/>
            <TextField
                name="category_name"
                select
                variant="outlined"
                label="Zutatenkategorie"
                onChange={handleChange}
                value={props.getIngredient(idx).category_name}
            >
                {props.getCategories().map((category, idx) => (
                    <MenuItem value={category} key={idx}>{category}</MenuItem>
                ))} 
            </TextField><br/>
            <TextField className={classes.numberInput}
                error={!isQuantityValid}
                helperText={isQuantityValid ? "" : "Die Menge muss positiv sein."}
                type="number"
                name="quantity"
                variant="outlined"
                label="Menge"
                onChange={handleChange}
                value={props.getIngredient(idx).quantity}
            />
            <TextField
                name="unit"
                select
                variant="outlined"
                label="Einheit"
                onChange={handleChange}
                value={props.getIngredient(idx).unit}
            >
                {props.units.map((unit, idx) => (
                    <MenuItem value={unit} key={idx}>{unit}</MenuItem>
                ))}
            </TextField>
        </div>
    );
}