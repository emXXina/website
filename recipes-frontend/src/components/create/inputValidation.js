const isValidRecipe = (recipe, openWarning) => {

    /**
     * Check title
     */
    if (recipe.name === "") {
        openWarning({
            errorTitle: "Kein Titel",
            errorDescription: "Bitte gib deinem Rezept einen Titel. Sollte dir keiner so richtig einfallen dann nimm doch einfach den Standardnamen für dein Gericht und füge ein &bdquo;à la&ldquo; und deinen Namen hinzu."
        });
        return false;
    }

    /**
     * Check categories
     */
    if (recipe.ingredientsInCategories.some((category) => category.name === "" || category.name === undefined)) {
        openWarning({
            errorTitle: "Kategorie ohne Namen",
            errorDescription: "Eine deiner Zutatenkategorien hat keinen Namen. Bitte stelle sicher, dass du jeder Kategorie einen Namen gibst. Solltest du nicht wollen, dass ein Name angezeigt wird, dann nenn die Kategorie &bdquo;main&ldquo;."
        });
        return false;
    }

    if (recipe.ingredientsInCategories.some((category) => category.ingredients === undefined || category.ingredients.length === 0)) {
        openWarning({
            errorTitle: "Kategorie ohne Zutaten",
            errorDescription: `Eine deiner Zutatenkategorien hat keine Zutaten. Füge entweder Zutaten hinzu oder lösche die Kategorie.`
        });
        return false;
    }

    /**
     * Check ingredients
     */
    if (recipe.ingredientsInCategories.some((category) => category.ingredients.some((ingredient) => ingredient.name === ""))) {
        openWarning({
            errorTitle: "Zutat ohne Namen",
            errorDescription: "Eine deiner Zutaten hat keinen Namen. Gib ihr einen Namen oder lösche sie."
        })
        return false;
    }
    
    /**
     * Check instruction
     */
    if (recipe.instructions.some((instruction) => instruction.text === "")) {
        openWarning({
            errorTitle: "Zubereitungsschritt ohne Text",
            errorDescription: "Einer deiner Zubereitungsschritte hat keinen Text. Füg entweder Text hinzu oder lösche diesen Zubereitungsschritt."
        })
    }

    return true;
}

export default isValidRecipe;