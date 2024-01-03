const {AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = (context) =>{
    const authHeaders = context.req.headers.authorization;
    if(authHeaders){
        const token = authHeaders.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            }catch (err){
                throw new AuthenticationError('Invalid/expire token')
            }

        }
        throw new Error("authectication token must be breare token")
    }
    throw new Error("authectication headers must be provided")

}

