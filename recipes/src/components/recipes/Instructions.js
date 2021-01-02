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
        }).then(jsonRes => {
            jsonRes.sort(function(a,b) {
                if (a.position < b.position) {
                    return -1;
                } else {
                    return 1;
                }
            });
            setInstructions(jsonRes);
        });
    }, [id]);

    return(
        <ol>
            <Typography variant="h4" className="recipeSubtitle" component="h3">Zubereitung</Typography>
            {instructions.map((instruction) => {
                return(
                    <li key={instruction.position}>{instruction.text}</li>
                );
            })}
        </ol>
    )
}