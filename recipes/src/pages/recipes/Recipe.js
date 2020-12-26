import { Card, Typography } from '@material-ui/core';
import React from 'react';
import {useParams} from 'react-router-dom';

export default function Recipe() {
    let {id} = useParams(); // 404 is recipe not found

    return(
        <Card>
            <Typography variant="h2">Recipe: {id}</Typography>
        </Card>
    );
}