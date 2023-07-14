const {response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req= request  , res = response ) =>{
    
    const { email, password } =req.body;


    try {

        let usuario = await Usuario.findOne( {email} );
        if( usuario){

            return res.status(400).json({
                ok:false,
                msg:`ya existe un usuario con el correo ${email}`
            })
        }
        
        usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            msg: 'se ha creado un nuevo usuario',
            token
        });

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }
    

}

const loginUsuario = async(req= request  , res = response ) =>{


    const {  email, password } =req.body;

    try {

        const usuario = await Usuario.findOne( {email} );
        if( !usuario){

            return res.status(400).json({
                ok:false,
                msg:`El usuario no existe con el correo ${email}`
            })
        }

        //Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password );
        
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:`La contraseña no es valida`
            })
        }


        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            msg:`Usuario logeado`,
            token

        });

        
    } catch (error) {

        console.log( error )
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });

    }
   

}

const revalidarToken = async(req = request  , res = response ) =>{

    const {uid , name } = req;

    //Generar un nuevo JWT

        const token = await generarJWT(uid, name); 

    	
    res.json({
        ok:true,
        token,    
        msg:'Token revalidado'
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
    
}