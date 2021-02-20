import React from "react";
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper, makeStyles, useTheme } from "@material-ui/core";

export default function IngredientTable(props) {
    const heading = props.heading;
    const ingredients = props.ingredients; // every element in contents has a name, unit and quantity

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
            padding: '.5rem 1rem',
            width: '70%'
        },
        bodyCell: {
            padding: '.5rem 1rem',
            borderWidth: '0px'
        }
    });
    const classes = useStyles();

    return(
        <TableContainer 
            elevation={0}
            component={Paper}
            className={classes.tableContainer}
            >
            <Table>
                { heading !== "main" &&
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.headCell}>{heading}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                }
                <TableBody>
                    {ingredients.map((ingredient, idx) => 
                        <TableRow key={idx}>
                            <TableCell className={classes.bodyCell}>{ingredient.name}</TableCell>
                            <TableCell className={classes.bodyCell}>
                                {ingredient.quantity == 0 ? "" : ingredient.quantity + "\u2009" + ingredient.unit}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}