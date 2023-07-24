const { response } =require('express');
const jwt = require('jsonwebtoken');

const validarJWT= ( req, res = response, next ) => {

    //x-token headers
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        });
    }

    try {
        console.log(token, process.env.SECRET_JWT_SEED )
        const {uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        console.log( error )
        return res.status(401).json({
            ok:false,
            msg: 'Token valido'
        });
    }


    next();

}


module.exports ={
    validarJWT
}