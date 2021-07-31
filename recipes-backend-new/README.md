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