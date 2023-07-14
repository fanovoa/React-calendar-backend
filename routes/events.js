/*
    Event Routes
    /api/events
*/

const { Router }= require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router();


const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

//Todos tienen que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos
router.get('/'  , getEventos );

// Crear un nuevo evento
router.post('/' , crearEvento );

// Actualizar un nuevo evento
router.put('/:id' , actualizarEvento );

// Borrar un nuevo evento
router.delete('/:id' , eliminarEvento );


module.exports = router;