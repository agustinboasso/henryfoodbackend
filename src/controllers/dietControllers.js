const { Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const cleanArray = (arr) => arr.map((e) =>{
    return {
        //eliminar guiones y espacios de las dietas
        diets: e.diets.map((diet) => diet.trim().replace(/-+$/, ''))
    }

})


const getDiets = async () => {
  const apiRes = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true&number=100`)  //https://api.spoonacular.com/  http://localhost:8080
  ).data
  const newApi = cleanArray(apiRes.results);

  //obetener nombres de dietas unicos
  const dietNames = new Set();
  newApi.forEach((item) =>{
    item.diets.forEach((diet) =>{
        dietNames.add(diet);
    })
  });

  //convertir conjunto de dietas en array
  const dietNamesUnique = [...dietNames];
 

  //guardar nombres de dietas en la bdd usando sql

  dietNamesUnique.forEach(async (dietName) => {
    await Diet.findOrCreate({
      where: { name: dietName },
    });
  });
  const dataBaseDiets = await Diet.findAll();
  return [...dataBaseDiets];
};



const postDiets = async (name) => {
  const newDiet = await Diet.create({name});
  return newDiet; 
}

module.exports = {
  getDiets,
  postDiets
};
