import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function AddFundamentals() {

    const theme = useTheme();
    const useStyles = makeStyles({
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                marginLeft: 0,
                textAlign: 'center'
            }
        }
    })
    const classes = useStyles();

    return(
        <div>
            <form className={classes.form} autoComplete='off'>
                <TextField
                    variant="filled"
                    id="name"
                    label="Name" />
                <TextField
                    className={classes.fullWidth}
                    fullWidth
                    variant="filled"
                    id="description"
                    label="Kurzbeschreibung" />
            </form>
        </div>
    );
}