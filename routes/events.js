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
const { isDate } = require('../helpers/isDate');

//Todos tienen que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos
router.get('/' , [], getEventos );

// Crear un nuevo evento
router.post('/' ,[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatorio').custom(isDate),
    check('end','La fecha de finalización es obligatorio').custom(isDate),

    validarCampos
], crearEvento );

// Actualizar un nuevo evento
router.put('/:id' ,[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatorio').custom(isDate),
    check('end','La fecha de finalización es obligatorio').custom(isDate),

    validarCampos
], actualizarEvento );

// Borrar un nuevo evento
router.delete('/:id' , eliminarEvento );


module.exports = router;