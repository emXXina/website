import React, {useState} from 'react';

import { CardActions, IconButton, Button } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import Share from '../utils/Share';
import { useReactToPrint } from 'react-to-print';

export default function RecipeActionBar(props) {
    const handlePrint = useReactToPrint({
        content: () => props.print.current
    })

    const [hoverEdit, setHoverEdit] = useState(false);
    const handleHoverEdit = () => setHoverEdit(! hoverEdit);

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
                <IconButton
                    aria-label="Bearbeiten"
                    color={hoverEdit ? "secondary" : "default"}
                    onMouseEnter={handleHoverEdit}
                    onMouseLeave={handleHoverEdit}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="Liken">
                    <FavoriteIcon/>
                </IconButton>
            </div>
        </CardActions>
    );
}