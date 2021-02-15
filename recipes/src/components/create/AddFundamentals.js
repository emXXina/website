import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function AddFundamentals(props) {

    const theme = useTheme();
    const useStyles = makeStyles({
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                marginLeft: 0
            }
        }
    })
    const classes = useStyles();

    return(
        <div>
            <Typography className="" paragraph>Hallöle!<br/>
                
            Danke, dass du dieser Seite ein neues Rezept hinzufügen möchtest.<br/>
            
            Zunächst einmal geht es hier um die grundlegenden Dinge.</Typography>

            <form className={classes.form} autoComplete='off'>
                <TextField
                    required
                    variant="outlined"
                    id="name"
                    label="Name"
                    onChange={event => props.setName(event.target.value)}
                    value={props.name} />
                <TextField
                    className={classes.fullWidth}
                    fullWidth
                    variant="outlined"
                    id="description"
                    label="Kurzbeschreibung"
                    onChange={event => props.setDescription(event.target.value)}
                    value={props.description} />
            </form>
        </div>
    );
}