import { IconButton } from '@material-ui/core';
import React from 'react';

import { Card } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function AddButton(props) {
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
        <Card raised className={classes.square}>
            <IconButton className={classes.icon} href="/create">
                <PostAddIcon fontSize="large" color="secondary" />
            </IconButton>
        </Card>
    )
}