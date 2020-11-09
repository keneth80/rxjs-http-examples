const express  = require('express');
const router   = express.Router();
const util     = require('../util');
const jwt      = require('jsonwebtoken');
const randtoken = require('rand-token');
const refreshTokens = require('./refresh-token');

const secretOrPrivateKey = process.env.JWT_SECRET;

const users = [
    {
        userId: '1234',
        userName: 'kenneth',
        password: '1111',
        token: 'fake-jwt-token'
    },
    {
        userId: '5678',
        userName: 'kenneth',
        password: '1111',
        token: 'fake-jwt-token'
    }
];

// login
router.post('/login',
    function (req, res, next) {
        let isValid = true;
        let message = '';
        if (!req.body.userId) {
            isValid = false;
            message = 'Username is required!';
        }

        if (!req.body.password) {
            isValid = false;
            message = 'Password is required!';
        }

        if (!isValid) return res.json(util.failJson(401, message));
        else next();
    },
    function (req, res, next) {
        const user = users.find((user) => user.userId === req.body.userId);

        if(!user || user.password !== req.body.password) {
            // return res.status(401).json(util.successFalse(null,'Username or Password is invalid'));
            return res.status(401).send(util.failJson(401, 'Username or Password is invalid'));
        } else {
            const payload = user;
            
            // var options = {expiresIn: 60*60*24};
            const options = {expiresIn: '5m'};
            jwt.sign(payload, secretOrPrivateKey, options, function(err, token) {
                if(err) return res.json(util.successFalse(err));
                // const refreshToken = randtoken.uid(256);
                // refreshTokens[user.userId] = refreshToken;

                // user.token = token;
                // user.refreshToken = refreshToken;

                res.json(util.successJson({
                    user,
                    access_token
                }));
            });
        }
    }
);

router.post('/token', function (req, res, next) {
    const userId = req.body.userId;
    const refreshToken = req.body.refreshToken;

    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == userId)) {
        const user = users.find((user) => user.userId === req.body.userId);

        const token = jwt.sign(user, secretOrPrivateKey, { expiresIn: '5m' });

        res.json({token: token});
    } else {
        res.status(401).send({
            status: 401,
            statusText: 'Please login again',
            data: []
        });
    }
});

router.post('/token/reject', function (req, res, next) { 
    const refreshToken = req.body.refreshToken;

    if (refreshToken in refreshTokens) { 
        delete refreshTokens[refreshToken];
    }

    res.send(204); 
});

// refresh
router.get('/refresh', util.isLoggedin,
    function(req, res, next) {
        const user = users.find((user) => user.userId === req.body.userId);

        if(!user) return res.json(util.successFalse({
            status: 401,
            statusText: 'There is no user information',
            data: []
        }));

        const options = {expiresIn: '5m'};
        jwt.sign(user, secretOrPrivateKey, options, function(err, token) {
            if(err) return res.json(util.successFalse(err));

            const refreshToken = randtoken.uid(256);
            refreshTokens[user.userId] = refreshToken;

            user.token = token;
            user.refreshToken = refreshToken;

            res.json(util.successTrue(user));
        });
    }
);

module.exports = router;
