const DaoObject = require("../../dao/mongodb/DaoObject");
module.exports = class Ingreso {
  IngresoDao = null;

  constructor(IngresoDao = null) {
    if (!(IngresoDao instanceof DaoObject)) {
      throw new Error("An Instance of DAO Object is Required");
    }
    this.IngresoDao = IngresoDao;
  }
  async init() {
    await this.IngresoDao.init();
    await this.IngresoDao.setup();
  }
  async getIngresoVersion() {
    return {
      entity: "Ingresos",
      version: "1.0.0",
      description: "CRUD de Ingresos",
    };
  }

  async addIngreso({
    type = "",
    description = "",
    amount = "",
    category = "",
  }) {
    const result = await this.IngresoDao.insertOne({
      type,
      description,
      amount,
      category,
    });
    return {
      type,
      description,
      amount,
      category,
      id: result.lastID,
    };
  }

  async getIngreso() {
    return this.IngresoDao.getAll();
  }

  async getIngresoById({ codigo }) {
    return this.IngresoDao.getById({ codigo });
  }

  async updateIngreso({ codigo, type,description,amount, category}) {
    const result = await this.IngresoDao.updateOne({
      codigo,
      type,
      description,
      amount,
      category,
    });
    return {
      id: codigo,
      type: type,
      description: description,
      amount: amount,
      category: category,
      modified: result.changes,
    };
  }

  async deleteIngreso({ codigo }) {
    const RegiToDelete = await this.IngresoDao.getById({ codigo });
    const result = await this.IngresoDao.deleteOne({ codigo });
    return {
      ...RegiToDelete,
      deleted: result.changes,
    };
  }
};
