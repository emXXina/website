import { IconButton } from '@material-ui/core';
import React from 'react';

import { Card } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function BasicBigButton(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        square: {
            display: 'block',
            width: '4rem',
            height: '4rem',
            margin: 'auto',
            lineHeight: '4',
            textAlign: 'center'
        },
        icon: {
            '&:hover': {
                color: theme.palette.secondary.main,
            }
        }
    });
    const classes = useStyles();

    return(
        <Card variant={props.hover ? "elevation" : "outlined"} raised={props.hover} className={classes.square}>
            <IconButton className={classes.icon} {...props.action}>
                {props.icon}
            </IconButton>
        </Card>
    )
}