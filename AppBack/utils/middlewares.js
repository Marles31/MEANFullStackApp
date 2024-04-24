const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.json({
            error: 'No token provided'
        })
    }
    const token = req.headers['authorization'];

    let payload;
    try {
        payload = jwt.verify(token, 'secret');
    } catch (error) {
        return res.json({
            error: 'Invalid token'
        })
    }
    
    next();
}

module.exports = {
    checkToken
}