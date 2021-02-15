import React from "react";
import { TextField } from '@material-ui/core';

export default function IngredientCategory(props) {
    const idx = props.idx;

    const handleChange = (event) => {
        props.renameCategory(idx, event.target.value);
    }

    return(
        <div className={props.classes.container}>
            <TextField
                name="name"
                required
                variant="outlined"
                label="Kategoriebezeichnung"
                onChange={handleChange}
                value={props.getCategories()[idx]}
            />
        </div>
    );
}