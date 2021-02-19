import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import NumberedElement from '../utils/NumberedElement';

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
        <div>
            <Typography variant="h4" className="recipeSubtitle" component="h3">Zubereitung</Typography>
            <div>
                {instructions.map((instruction,i) => {
                    return(
                        <NumberedElement
                            key={instruction.position}
                            number={instruction.position}
                            content={instruction.text}
                            />
                    );
                })}
            </div>
        </div>
    )
}