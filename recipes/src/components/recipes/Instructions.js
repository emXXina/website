import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

export default function Instructions(props) {
    const id = props.id;

    const [instructions, setInstructions] = useState([]);
    useEffect(() => {
        fetch(`/instructions/givenRecipe/${id}`).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setInstructions(jsonRes));
    }, [id]);

    return(
        <ol>
            <Typography variant="h4" className="recipeSubtitle" component="h3">Zubereitung</Typography>
            {instructions.map((instruction) => {
                return(
                    <li>{instruction.text}</li>
                );
            })}
        </ol>
    )
}