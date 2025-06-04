const database = require("./database");
const FoodRepository = require("./repository");

const repository = new FoodRepository(database);

async function getAllFoods(request, reply) {
  const responseDB = await repository.getAllFoods();

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}

/* Retorna uma comida pelo ID, como também o seu
   preço e os seus recheios */
async function getFoodById(request, reply) {
  const id = request.params.id;

  const responseFood = await repository.getFoodById(id);
  const responseFillings = await repository.getFillingsById(id);

  if (responseFood.error) return reply.status(404).json(responseFood.error);

  const response = {
    food: responseFood,
    fillings: responseFillings,
  };

  reply.json(response);
}

async function setPayment(request, reply) {
  const payInfo = request.body;
  
  const responseDB = await repository.setPayment(payInfo);

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}

async function getHistoric(req, res) {
  const cpf = req.params.cpf;
  const historic = await resository.getHistoric(cpf);
  if (historic.error) {
    return res.status(404).json({ error: historic.error });
  } else {
    return res.json(historic);
  }
}
module.exports = { getAllFoods, getFoodById, setPayment, getHistoryByCpf };
