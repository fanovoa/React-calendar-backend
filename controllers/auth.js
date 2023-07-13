const {response, request } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = (req= request  , res = response ) =>{
    
    const { name, email, password } =req.body;

    //Manejo de errores
    const errors = validationResult( req );
    if(!errors.isEmpty() ) {
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        });
    }

    res.status(201).json({
        ok:true,
        msg:'registro',
        name,
        email,
        password
    });

}

const loginUsuario = (req= request  , res = response ) =>{


    const {  email, password } =req.body;
    const errors = validationResult( req );

    if(!errors.isEmpty() ) {
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        });
    }
    

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