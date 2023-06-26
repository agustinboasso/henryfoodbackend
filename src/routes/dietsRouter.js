const {Router} = require("express");
const {getDietsHandler, createDiet
    } = require("../handlers/dietsHandlers")

const diets = Router();

diets.get("/", getDietsHandler);
diets.post("/", createDiet);

module.exports = diets;
