const { request, response } = require('express');

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Token not validated'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service needs one of these roles: ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    hasRole
}