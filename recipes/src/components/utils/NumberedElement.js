import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function NumberedElement(props) {

    const theme = useTheme();
    const useStyles = makeStyles({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '.7rem 0'
        },
        number: {
            borderRadius: theme.shape.borderRadius,
            borderColor: theme.palette.divider,
            borderWidth: '1px',
            borderStyle: 'solid',
            padding: '.4rem',
            background: theme.palette.background.default,
            display: 'block',
            width: '1.25em',
            height: '1.25em',
            lineHeight: '1.25',
            textAlign: 'center',
            fontWeight: '500'
        },
        content: {
            marginLeft: '1rem'
        }
    });
    const classes = useStyles();

    return(
        <div className={classes.container}>
            <div className={classes.number}>{props.number}</div>
            <div className={classes.content}>{props.content}</div>
        </div>
    )
}