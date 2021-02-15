import React from "react";
import { TextField, IconButton, useTheme } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function IngredientCategory(props) {
    const idx = props.idx;
    const theme = useTheme();

    const handleChange = (event) => {
        props.renameCategory(idx, event.target.value);
    }

    return(
        <div className={props.classes.container} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <TextField
                name="name"
                required
                variant="outlined"
                label="Kategoriebezeichnung"
                onChange={handleChange}
                value={props.getCategories()[idx]}
            />
            { props.getCategories().length > 1 &&
                <IconButton onClick={event => props.removeCategory(idx)}>
                    <HighlightOffIcon/>
                </IconButton>
            }
        </div>
    );
}