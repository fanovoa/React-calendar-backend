const {response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req= request  , res = response ) =>{
    
    const { email, password } =req.body;


    try {

        let usuario = await Usuario.findOne( {email} );
        if( usuario){

            return res.status(400).json({
                ok:false,
                msn:`ya existe un usuario con el correo ${email}`
            })
        }
        
        usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            msg: 'se ha creado un nuevo usuario'
        });

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }
    

}

const loginUsuario = (req= request  , res = response ) =>{


    const {  email, password } =req.body;
    
    res.json({
        ok:true,
        msg:'login',
        email,
        password
    });

}

const revalidarToken = (req = request  , res = response ) =>{
    	
    res.json({
        ok:true,
        msg:'renew'
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
    
}