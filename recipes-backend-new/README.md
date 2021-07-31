# Backend API

## POST /backend/recipe

Takes a body like

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        'name': STRING,
        'description': STRING,
        'categories': LIST-OF-STRINGS,
        'ingredients': LIST-OF-LIST-OF-NAME-UNIT-QUANTITY-CATEGORY,
        'instructions': LIST-OF-STRINGS
    })
};

to add a new recipe to the recipes collection in the finnupa-de db.

## PUT /backend/recipe

Takes body containing any of the possible options from [POST /backend/recipe] and overrites the entire recipe