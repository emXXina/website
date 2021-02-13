import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function Ingredient() {
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
        }
    })
    const classes = useStyles();

    return(
        <div className={classes.container}>

        </div>
    );
}