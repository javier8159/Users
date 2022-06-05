const express = require('express');
const router =express.Router();

const categoriesRoutes = require('./categorias');
router.use('/categories', categoriesRoutes);
const usuariosRoutes = require('./usuarios');
router.use('/usuarios', usuariosRoutes);
const ingresosRoutes = require('./ingresos');
router.use('/ingresos', ingresosRoutes);
module.exports = router;