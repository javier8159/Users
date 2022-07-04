const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class IngresoDao extends DaoObject{
  constructor(db = null){
    console.log('IngresoDao db: ', db);
    super(db, 'Ingresos');
  }
   async setup(){
    if (process.env.MONGODB_SETUP) {
    }
  }

  getAll(){
    return this.find();
  }

  getById( {id} ){
  return this.findById(id);
  }

  insertOne({type,description,amount,category}) {
    return super.insertOne({type, description, amount, category});
  }

  updateOne({type,description,amount,category,id}){
   const updateComand = {
    '$set': {
        type,
        description,
        amount,
        category
    }
   };
   return super.updateOne(id, updateComand);
  }

  deleteOne({ id }) {
    return super.removeOne(id);
  }

}