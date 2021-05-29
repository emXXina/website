const basics = require('./basics.model');

// constructor
const Instruction = function(instruction) {
    this.text = instruction.text;
    this.position = instruction.position;
    this.recipe_id = instruction.recipe_id;
};

Instruction.create = (newInstruction, result) => {
    basics.create(result, "instructions", newInstruction);
};

Instruction.getByRecipeNPosition = (recipeId, position, result) => {
    basics.getAllWhere(result, "instructions", `recipe_id = ${recipeId} AND position = ${position}`)
};

Instruction.getByRecipeId = (recipeId, result) => {
    basics.getAllWhere(result, "instructions", `recipe_id = ${recipeId}`);
};

module.exports = Instruction;