const {response, request } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req = request, res =response  )  => {

    const eventos = await Evento.find()
                                .populate('user','name');

    res.json({
        ok:true,
        eventos,
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

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ){
            res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new:true } );

        res.json({
            ok:true,
            msg: 'evento actualizado',
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

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