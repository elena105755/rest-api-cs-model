const jwt = require('./extended/jwt.js');

module.exports = (req, res, next) => {
    try{
        const decoded = jwt.decoder(req.body.token);
        req = decoded;
        next();
    }
    catch{
        return res.status(401).json({
            message: "Authorization failed"
        });
    }
}