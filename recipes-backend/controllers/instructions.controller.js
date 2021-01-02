const Instruction = require('../models/instructions.model.js');
const basics = require('./basics.controller');

exports.create = (req, res) => {
    basics.checkReqBody(req, res);

    // TODO: check whether position and recipe_id combi already exists
    Instruction.getByRecipeNPosition(req.body.recipe_id, req.body.position, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                // create instruction
                const instruction = new Instruction({
                    text: req.body.text,
                    position: req.body.position,
                    recipe_id: req.body.recipe_id
                });
            
                Instruction.create(instruction, basics.resultHandling(req, res,
                    `Saving an instruction should not lead to an 404 error.`,
                    `Error while saving an instruction.`));
            } else {
                res.status(500).send({
                    message: err.message || `Error retrieving instruction with recipe id ${req.body.recipe_id} and position ${req.body.position}.`
                });
            }
        } else {
            // instruction with this recipe_id and position already exists
            res.status(409).send({
                message: `Recipe with id ${req.body.recipe_id} has already an instruction with position ${req.body.position}.`
            });
        }
    })
};

exports.getByRecipeNPosition = (req, res) => {
    Instruction.getByRecipeNPosition(req.params.recipeId, req.params.position, basics.resultHandling(req, res,
        `Could not find instruction with recipe id ${req.params.recipeId} and position ${req.params.position}.`,
        `Error retrieving instruction with recipe id ${req.params.recipeId} and position ${req.params.position}.`));
}

exports.getByRecipeId = (req, res) => {
    Instruction.getByRecipeId(req.params.recipeId, basics.resultHandling(req, res,
        `Getting all instructions for the recipe with id ${req.params.recipeId} should not result in a 404 error.`,
        `Error retrieving instruction with recipe id ${req.params.recipeId}.`));
}