const { getDiets, postDiets } = require("../controllers/dietControllers");

const getDietsHandler = async (req, res) => {
    try {
      const response = await getDiets();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
const createDiet = async (req, res)=>{
    try {
      const {name} =req.body;
      const newDiet = await postDiets(name);
      res.status(200).json(newDiet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  
    
}  

  module.exports = {
    getDietsHandler,
    createDiet, 
  }