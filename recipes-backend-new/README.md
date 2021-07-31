# Backend API

## GET /backend/recipe

Retrieves all recipes

## POST /backend/recipe

Takes a body like

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "name": "Feta-Tomatensauce",
        "description": "Etwas schwerere, aber sehr leckere Tomatensauce.","ingredientsInCategories":[
            {
                "name":"main",
                "ingredients":[
                    {
                        "name":"Zwiebeln",
                        "unit":"Stück",
                        "quantity":"2"
                    },{
                        "name":"Feta/Hirtenkäse",
                        "unit":"g",
                        "quantity":"300"
                    }
                ]
            }
        ],
        "instructions":[
            {
                "text":"Schneide die Zwiebeln und brate sie in einer großen Pfanne an."
            },{
                "text":"Gebe den Feta, die passierten Tomaten, das Tomatenmark und Wasser dazu."
            }
        ]
    })
};


to add a new recipe to the recipes collection in the finnupa-de db.

## PUT /backend/recipe

Takes body containing any of the possible options from [POST /backend/recipe] and overrites the entire recipe


## DELETE /backend/recipe

Deletes first recipe with name specified in the request body.

## GET /backend/recipe/:id

Retrieves information about the recipe with given id