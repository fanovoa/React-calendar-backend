const {response, request } = require('express');
const Evento = require('../models/Evento');

const getEventos = ( req = request, res =response  )  => {

    res.json({
        ok:true,
        msg: 'getEventos'
    });

}


const crearEvento = async( req = request, res =response  )  => {

    //Verificar que tenga el Evento
    const evento = new Evento( req.body );

       try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado,
            msg: 'se ha guardado el evento'
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    console.log( req.body );

  

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