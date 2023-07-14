const {response, request } = require('express');

const getEventos = ( req = request, res =response  )  => {

    res.json({
        ok:true,
        msg: 'getEventos'
    });

}


const crearEvento = async( req = request, res =response  )  => {

    //Verificar que tenga el Evento
    console.log( req.body );

    res.json({
        ok:true,
        msg: 'crearEvento'
    });

}

const actualizarEvento = async( req = request, res =response  )  => {

    res.json({
        ok:true,
        msg: 'actualizarEvento'
    });

}

const eliminarEvento = async( req = request, res =response  )  => {

    res.json({
        ok:true,
        msg: 'eliminarEvento'
    });

}

module.exports ={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}