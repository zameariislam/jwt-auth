
let jwt = require('jsonwebtoken');
const checkLogin = (req, res, next) => {

    try {

        const { authorization } = req.headers
        
        const token = authorization.split(' ')[1]
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name, id } = decoded
        req.name = name
        req.id = id
        next()

    }
    catch (err) {
        res.status(401).send('Authentication Failed')

    }



}

module.exports = checkLogin