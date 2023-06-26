const {Router} = require("express");
const {
    getRecipesHandler,
    getRecipesById,
    postRecipesHandler} = require("../handlers/recipesHandlers")


const recipes = Router();

recipes.get("/", getRecipesHandler); // llamar los datos de bd, api y unirlos unificando el formato. Cuando tenga los datos, responder con ellos

recipes.get("/:id", getRecipesById);
recipes.post("/", postRecipesHandler);

module.exports = recipes;