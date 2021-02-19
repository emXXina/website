import React from "react";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import IngredientTable from "../recipes/IngredientTable.js";
import NumberedElement from "../utils/NumberedElement";

export default function FinishingPage(props) {
    return(
        <div>
            <Typography>Wenn du sicher bist, dass du wirklich fertig bist, drücke auf Fertig.</Typography>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="overline" paragraph>Rezeptentwurf</Typography>
                    {props.name === "" ? 
                        <Typography variant="h2" color="error" paragraph>Kein Titel</Typography>
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
                    {props.categories.map((category, idx) => {
                        let ingredientsOfCategory = props.ingredients.filter((i) => {return i.category_name === category});
                        return(
                            <IngredientTable key={idx} heading={category}  ingredients={ingredientsOfCategory}/>
                        );
                    })}
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="h4" className="recipeSubtitle" component="h2">Zubereitung</Typography>
                    <div>
                        {props.instructions.map((instruction,idx) => {
                            return(
                                <NumberedElement
                                    key={idx}
                                    number={idx}
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