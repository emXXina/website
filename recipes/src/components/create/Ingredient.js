import React, { useState, useRef } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MenuItem, TextField } from "@material-ui/core";

export default function Ingredient(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        container: {
            borderRadius: theme.shape.borderRadius,
            borderColor: theme.palette.divider,
            borderWidth: '1px',
            borderStyle: 'solid',
            padding: '.4rem',
            background: theme.palette.background.default,
            display: 'block',
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                marginLeft: 0
            },
            '& .MuiSelect-root': {
                width: '200px'
            }
        },
        numberInput: {
            width: '7rem',
        }
    })
    const classes = useStyles();

    const idx = props.idx;
    const categories = useRef(props.categories);
    const units = useRef(props.units);
    const getIngredient = props.getIngredient;
    const setIngredient = props.setIngredient;
    const [isQuantityValid, setIsQuantityValid] = useState(true);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "quantity" && value < 0) {
            setIsQuantityValid(false);
        } else {
            setIngredient(idx, name, value);

            if (name === "quantity") {
                setIsQuantityValid(true);
            }
        }
    }

    return(
        <div className={classes.container}>
            <TextField
                name="name"
                required
                variant="outlined"
                label="Zutatenbezeichnung"
                onChange={handleChange}
                value={getIngredient(idx).name}
            /><br/>
            <TextField
                name="category_name"
                select
                variant="outlined"
                label="Zutatenkategorie"
                onChange={handleChange}
                value={getIngredient(idx).category_name}
            >
                {categories.current.map((category, idx) => (
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
                value={getIngredient(idx).quantity}
            />
            <TextField
                name="unit"
                select
                variant="outlined"
                label="Einheit"
                onChange={handleChange}
                value={getIngredient(idx).unit}
            >
                {units.current.map((unit, idx) => (
                    <MenuItem value={unit} kex={idx}>{unit}</MenuItem>
                ))}
            </TextField>
        </div>
    );
}