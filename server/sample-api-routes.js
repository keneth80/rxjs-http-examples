const router = require('express').Router();

const samplFunctions = require('./sample/sample-functions');
const samplFunction = require('./sample/sample-function');

router.route('/functions')
    .get(samplFunctions.get)
    .post(samplFunctions.post);

router.route('/functions/:category')
    .get(samplFunctions.get)
    .post(samplFunctions.post);

router.route('/functions/:category/id/:id')
    .get(samplFunction.get)
    .put(samplFunction.put)
    .delete(samplFunction.delete);

module.exports = router;