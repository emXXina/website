import React from 'react';
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