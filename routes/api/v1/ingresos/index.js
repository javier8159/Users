const express = require('express');
const router = express.Router();
const Ingreso = require('../../../../libs/ingresos');
const IngresoDao = require('../../../../dao/mongodb/models/IngresoDao');
const catDao = new IngresoDao();
const cat = new Ingreso(catDao);
cat.init();

router.get('/', async (req, res) => {
  // extraer y validar datos del request
  try {
    // devolver la ejecución el controlador de esta ruta
    const versionData = await cat.getIngresoVersion();
    return res.status(200).json(versionData);
  } catch ( ex ) {
    // manejar el error que pueda tirar el controlador
    console.error('Error Ingreso', ex);
    return res.status(502).json({'error': 'Error Interno de Server'});
  }
}); // get /

router.get('/all', async (req, res) => {
  try {
    const ingreso = await cat.getIngreso();
    return res.status(200).json(ingreso);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({error:'Error al procesar solicitud.'});
  }
});

router.get('/byid/:codigo', async (req, res) => {
  try {
    const {codigo} = req.params;
    if (!(/^\d+$/.test(codigo))){
      return res.status(400).json({
        error: 'Se espera un codigo numérico'
      });
    }
    const Ingreso = await cat.getIngresoById({codigo: parseInt(codigo)});
    return res.status(200).json(Ingreso);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({ error: 'Error al procesar solicitud.' });
  }
} );

router.post('/new', async (req, res) => {
  try {
    const {type= '', description='', amount='',category='' } = req.body;
    if (/^\s*$/.test(type)) {
      return res.status(400).json({
        error: 'Se espera valor de type'
      });
    }
    
    const newIngreso = await cat.addIngreso({type,description,amount, category});
    return res.status(200).json(newIngreso);
  } catch(ex){
    console.error(ex);
    return res.status(502).json({error:'Error al procesar solicitud'});
  }
});

router.put('/update/:codigo', async (req, res)=>{
  try {
    const {codigo} = req.params;
    if(!(/^\d+$/.test(codigo))) {
      return res.status(400).json({error:'El codigo debe ser un dígito válido.'});
    }
    const {type,description,amount, category} = req.body;
    if (/^\s*$/.test(type)) {
      return res.status(400).json({
        error: 'Se espera valor de type'
      });
    }

    const updateResult = await cat.updateIngreso({codigo:parseInt(codigo),type,description,amount, category});

    if (!updateResult) {
      return res.status(404).json({error:'Ingreso no encontrada.'});
    }
    return res.status(200).json({updatedIngreso:updateResult});

  } catch(ex) {
    console.error(ex);
    res.status(500).json({error: 'Error al procesar solicitud.'});
  }
});


router.delete('/delete/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^\d+$/.test(codigo))) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }

    const deletedIngreso = await cat.deleteIngreso({ codigo: parseInt(codigo)});

    if (!deletedIngreso) {
      return res.status(404).json({ error: 'Ingreso no encontrada.' });
    }
    return res.status(200).json({ deletedIngreso});

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});

module.exports = router;