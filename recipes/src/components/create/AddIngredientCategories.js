import React from "react";
import IngredientCategory from "./IngredientCategory";
import BasicBigButton from "../utils/BasicBigButton";
import AddIcon from '@material-ui/icons/Add';
import { GridList, GridListTile, Typography } from '@material-ui/core';

function AddIngredients(props) {
    const getCategoryTiles = () => {
        var tiles = [];
        console.log(props.getCategories());
        for (var i = 0; i < props.getCategories().length; i++) {
            tiles.push(
                <GridListTile key={i} className={props.classes.tile}>
                    <IngredientCategory
                        idx={i}
                        getCategories={props.getCategories}
                        renameCategory={props.renameCategory}
                        removeCategory={props.removeCategory}
                        classes={props.classes}
                    />
                </GridListTile>
            )
        }
        return tiles;
    }

    return(
        <form>
            <Typography paragraph>
                Wenn du möchtest, kannst du deine Zutaten in Kategorien aufteilen wie zum Beispiel "Teig" und
                "Belag". Solltest du das nicht brauchen, dann lass die Zutatenkategorie bei deinen Zutaten einfach
                bei "main".
            </Typography>
            <GridList cellHeight="auto" cols={1} spacing={0}>
                {getCategoryTiles()}
            </GridList>
            <BasicBigButton icon={<AddIcon/>} action={{onClick: props.addCategory}}/>
        </form>
    );
}

export default AddIngredients;