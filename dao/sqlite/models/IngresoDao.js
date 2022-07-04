const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class IngresoDao extends DaoObject{
  constructor(db = null){
    console.log('IngresoDao db: ', db);
    super(db);
  }
  async setup(){
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS ingreso (id INTEGER PRIMARY KEY AUTOINCREMENT, type EXPENSES, description TEXT, date TEXT, amount DECIMAL, category TEXT);';
      await this.run(createStatement);
    }
  }

  getAll(){
    return this.all(
      'SELECT * from ingreso;', []
    );
  }

  getById( {codigo} ){
    const sqlstr= 'SELECT * from ingreso where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({type,description,amount, category}) {
    const date = new Date().toDateString();
    const sqlstr = 'INSERT INTO ingreso (type,description,date,amount, category) values (?,?,?,?,?);';
    const sqlParamArr = [type,description,date,amount, category];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({codigo, type,description,amount, category}){
    const sqlstr= 'UPDATE ingreso set type = ?, description = ? ,amount =? ,category=? where id = ?;';
    const sqlParamArr = [type,description,amount, category, codigo];
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM ingreso where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }

}