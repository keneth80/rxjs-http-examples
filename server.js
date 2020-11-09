const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const cors = require('cors');
const app = express();

const apiRoutes = require('./server/sample-api-routes');

app.set('port', process.env.PORT || 4400);
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/self-ml'));
app.use('/api/auth', require('./server/auth/auth'));
app.use('/api', apiRoutes);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/self-ml/index.html'));
});

app.listen(app.get('port'), () => {
    console.log("Running Rest Hub on port " + app.get('port'));
});