import React, {useState, useEffect} from 'react';
import './recipelist.scss';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function RecipeList(props) {
    const theme = useTheme();
    const isTiny = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme.breakpoints.only('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.only('md'));
    const isLarge = useMediaQuery(theme.breakpoints.only('lg'));
    const isHuge = useMediaQuery(theme.breakpoints.only('xl'));

    const calcColNum = (() => {
        if (isTiny) {
            return 1;
        } else if (isSmall) {
            return 2;
        } else if (isMedium) {
            return 3;
        } else if (isLarge) {
            return 4;
        } else if (isHuge) {
            return 5;
        }
    })

    return(
        <GridList cellHeight="auto" cols={calcColNum()} spacing={0}>
            {props.recipeCards.map((recipeCard) => (
                <GridListTile key={recipeCard.key}>
                    {recipeCard}
                </GridListTile>
            ))}
        </GridList>
    );
}

export default RecipeList;