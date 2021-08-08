import React from 'react';
import { Typography } from '@material-ui/core';
import NumberedElement from '../utils/NumberedElement';

export default function Instructions(props) {
    const instructions = props.instructions || [];

    return(
        <div>
            <Typography variant="h4" className="recipeSubtitle" component="h3">Zubereitung</Typography>
            <div>
                {instructions.map((instruction,i) => {
                    return(
                        <NumberedElement
                            key={i+1}
                            number={i+1}
                            content={instruction.text}
                            />
                    );
                })}
            </div>
        </div>
    )
}