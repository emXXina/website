import React from "react";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import IngredientTable from "../recipes/IngredientTable.js";
import NumberedElement from "../utils/NumberedElement";

export default function FinishingPage(props) {
    return(
        <div>
            <Typography paragraph>Wenn du sicher bist, dass du wirklich fertig bist, drücke auf Fertig.</Typography>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="overline" paragraph>Rezeptentwurf</Typography>
                    {props.name === "" ? 
                        <Alert severity="error"><Typography variant="h2">Kein Titel</Typography></Alert>
                    :
                        <Typography variant="h2" paragraph>{props.name}</Typography>
                    }
                    {props.description !== "" &&
                        <Typography>{props.description}</Typography>
                    }
                </CardContent>
                <Divider/>
                <CardContent>
                    <Typography variant="h4" className="recipeSubtitle" component="h2">Zutaten</Typography>
                    {props.ingredientsInCategories.map((category, idx) => {
                        const ingredientTable = <IngredientTable key={idx} heading={category.name}  ingredients={category.ingredients}/>;
                        if (category.ingredients.some((ingredient) => ingredient.name === "")) {
                            const emptyIngredientWarnung = <Alert severity="error">Achtung: Eine Zutat der folgenden Kategorie ({category.name}) hat keinen Namen.</Alert>
                            return([emptyIngredientWarnung, <br></br>, ingredientTable]);
                        }
                        return(ingredientTable);
                    })}
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="h4" className="recipeSubtitle" component="h2">Zubereitung</Typography>
                    <div>
                        {props.instructions.some((instruction) => instruction.text === "") && 
                            <Alert severity="error">Achtung: Einer der folgenden Zubereitungsschritte hat keinen Text.</Alert>
                        }
                        {props.instructions.map((instruction,idx) => {
                            return(
                                <NumberedElement
                                    key={idx+1}
                                    number={idx+1}
                                    content={instruction.text}
                                    />
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}