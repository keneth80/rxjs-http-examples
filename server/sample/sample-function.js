const Reponse = require('../model/response');

exports.get = (request, response) => {
    console.log('sampl function get : ', request.params, request.body);
    const res = Reponse.clone({
        status: "success",
        statusText: "function retrieved successfully",
        data: {
            id: 0,
            functionType: 'A',
            name: 'function0'
        }
    });
    response.json(res);
};

exports.put = (request, response) => {
    console.log('sampl function put : ', request.params, request.body);
    response.json({
        status: "success",
        statusText: "function retrieved successfully",
        data: {
            id: 0,
            functionType: 'A',
            name: 'function0'
        }
    });
};

exports.delete = (request, response) => {
    console.log('sampl function delete : ', request.params, request.body);
    response.json({
        status: "success",
        statusText: "function retrieved successfully",
        data: {
            id: 0,
            functionType: 'A',
            name: 'function0'
        }
    });
}