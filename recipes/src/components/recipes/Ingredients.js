import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import './recipes.scss';

export default function Ingredients(props) {
    const id = props.id;

    // update categories
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`/ingredient_categories/givenRecipe/${id}`).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => setCategories(jsonRes));
    }, [id]);

    // update ingredients
    const [ingredients, setIngredients] = useState(new Map());
    useEffect(() => {
        categories.forEach( (category) =>
            fetch(`/ingredients/givenCategory/${category.id}`).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(jsonRes => {
                ingredients.set(category.id, jsonRes);
                setIngredients(new Map(ingredients));
            })
        )
    }, [categories]);


    const theme = useTheme();
    const useStyles = makeStyles({
        tableContainer: {
            marginBottom: '1rem',
            maxWidth: '400px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: theme.palette.divider,
            background: theme.palette.background.default
        },
        headCell: {
            padding: '.5rem 1rem'
        },
        bodyCell: {
            padding: '.5rem 1rem',
            borderWidth: '0px'
        }
    });
    const classes = useStyles();


    return(
        <div>
            <Typography variant="h4" className="recipeSubtitle" component="h3">Zutaten</Typography>

            { categories.map((category) => {
                let ingredientsOfCategory = ingredients.get(category.id);
                if (ingredientsOfCategory !== undefined && ingredientsOfCategory.length > 0) {
                    return(
                        <TableContainer 
                            elevation={0}
                            key={category.id}
                            component={Paper}
                            className={classes.tableContainer}
                            >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.headCell}>{category.name}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ingredientsOfCategory.map((ingredient) => 
                                        <TableRow key={ingredient.id}>
                                            <TableCell className={classes.bodyCell}>{ingredient.name}</TableCell>
                                            <TableCell className={classes.bodyCell}>
                                                {ingredient.quantity + "\u2009" + ingredient.unit}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                } else {
                    return(<div key={category.id}></div>);
                }
            })}
        </div>
    );
}