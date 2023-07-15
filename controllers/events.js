const {response, request } = require('express');
const Evento = require('../models/Evento').default;

const getEventos = async( req = request, res =response  )  => {

    const eventos = await Evento.find()
                                .populate('user','name');

    return res.json({
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
        return res.json({
            ok:true,
            evento:eventoGuardado,
            msg: 'se ha guardado el evento'
        });
        
    } catch (error) {
        return res.status(500).json({
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
            return res.status(404).json({
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

        return res.json({
            ok:true,
            msg: 'evento actualizado',
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const eliminarEvento = async( req = request, res =response  )  => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ){
           return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        return res.json({
            ok:true,
            id:eventoId,
            msg: 'evento eliminado'
        });
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

module.exports ={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}