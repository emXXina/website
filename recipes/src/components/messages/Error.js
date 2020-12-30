import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

export default function Error(props) {
    let message = props.message;

    return(
        <Card className="card">
            <CardContent>
                <Typography variant="h4" component="h2" color="error">Fehler</Typography>
                <Typography variant="body1">{message}</Typography>                
            </CardContent>
        </Card>
    );
}