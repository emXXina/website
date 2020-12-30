import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function Error(props) {
    let message = props.message;

    return(
        <Alert severity="error" variant="outlined" style={{ backgroundColor: '#ffffff' }}>
            <AlertTitle>Fehler</AlertTitle>
            {message}
        </Alert>
    );
}