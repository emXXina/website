import React from 'react';

import { CardActions, IconButton, Button } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Share from '../actions/Share';
import { useReactToPrint } from 'react-to-print';

export default function RecipeActionBar(props) {
    const handlePrint = useReactToPrint({
        content: () => props.print.current
    })

    return(
        <CardActions className="card__actions">
            <div>
                <IconButton color="primary" href="/" aria-label="zurueck">
                    <NavigateBeforeIcon/>
                </IconButton>
            </div>
            <div>
                <Button color="primary" variant="outlined" onClick={handlePrint}>
                    Drucken
                </Button>
                <Share/>
                <IconButton aria-label="Liken">
                    <FavoriteIcon/>
                </IconButton>
            </div>
        </CardActions>
    );
}