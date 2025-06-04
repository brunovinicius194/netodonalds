class FoodRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllFoods() {
    try {
      const sql = "select * from foods";
      const responseDB = await this.database.query(sql);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getFoodById(id) {
    try {
      const sql = "select name, price from foods where id = $1";
      const responseDB = await this.database.query(sql, [id]);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getFillingsById(id) {
    try {
      const sql = "select name, price from fillings where id_foods = $1";
      const responseDB = await this.database.query(sql, [id]);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async setPayment(payInfo) {
    try {
      const sql = `INSERT into payments(id_food, cpf, pay_date, description, price)
      VALUES($1, $2, $3, $4, $5)`;
      const response = await this.database.query(
        sql,
        payInfo.id_food,
        payInfo.cpf,
        payInfo.pay_date,
        payInfo.description,
        payInfo.price
      );

      return "Pagamento realizado!";
    } catch (error) {
      return { error: error.message };
    }
  }

  

  async getHistoric(cpf) {
    try {
      const rows = "SELECT * from payment WHERE cpf_client = $1";
      const esposta = await this.database.query(rows, [cpf]);
      return esposta.rows;
    } catch (error) {
      throw Error("Database query failed");
    }
  }
}

module.exports = FoodRepository;
