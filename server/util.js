const jwt = require('jsonwebtoken');

const util = {};

util.successJson = function (data) {
    return {
        status: 200,
        statusText: 'success',
        data: data
    };
};

util.failJson = function (code, message) {
    return {
        status: code,
        statusText: message,
        data: []
    };
};

util.successTrue = function (data) {
    return {
        status: 200,
        statusText: '',
        data: data
    };
};

util.successFalse = function (err, message) {
    if(!err && !message) message = 'data not found';
    
    return {
        status: err.code,
        statusText: err.message,
        data: []
    };
};

util.parseError = function (errors) {
    const parsed = {};
    if(errors.name == 'ValidationError') {
        for(var name in errors.errors) {
            var validationError = errors.errors[name];
            parsed[name] = { message:validationError.message };
        }
    } else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
        parsed.username = { message:'This username already exists!' };
    } else {
        parsed.unhandled = errors;
    }

    return parsed;
};


// middlewares
util.isLoggedin = function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.json(util.successFalse(null,'token is required!'));
    else {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.json(util.successFalse(err));
            } else{
                req.decoded = decoded;
                next();
            }
        });
    }
};

module.exports = util;