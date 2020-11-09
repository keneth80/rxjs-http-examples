const Reponse = require('../model/response');
const FunctionItem = require('../model/function-item');
const util     = require('../util');
const jwt      = require('jsonwebtoken');
const refreshTokens = require('../auth/refresh-token');

exports.get = (request, response) => {
    const token = request.headers["x-access-token"];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        // err
        // decoded undefined
        if (err || !decoded) {
            response.status(401).send({
                status: 401,
                statusText: 'Please login again.',
                data: []
            });
        } else {
            success();
        }
    });

    const success = () => {
        let functions = [
            FunctionItem.clone({
                "name": "CSVReader",
                "args": [["file_path", "string"]],
                "return_type": "pandas.DataFrame",
                "category": "DataRetrieval",
                "description": "CSV 파일 로딩",
                "shape": "source"
            }),
            FunctionItem.clone({
                "name": "RandomForestClassifier",
                "args": [
                    ["n_estimators", "int"],
                    ["max_depth", "int"],
                    ["min_samples_split", "int"]
                ],
                "return_type": "sklearn.classifier.RandomForestClassifier",
                "category": "Train",
                "description": "RandomForest Classifier 입니다. 이 함수는 scikit learn 에 포함돼 있는 함수를 래핑하여 제공되는 것으로, 변수 중요도도 뽑을 수 있습니다. 완전 강추!",
                "shape": "i-model"
            }),
            FunctionItem.clone({
                "name": "LinearRegression",
                "args": [
                    ["reg_method", ["None", "LASSO", "Ridge", "ElasticNet"]]
                ],
                "return_type": "sklearn.regression.linear_model",
                "category": "Train",
                "description": "sklearn 의 선형 회귀모형입니다. 다양한 세부 모델을 제공합니다. 이 정보는 예제이며, 실제 sklearn 에는 sklearn.regression.linear_model 이라는 클래스가 없습니다.",
                "shape": "i-model"
            })
        ];
    
        if (request.params.category) {
            functions = functions.filter((item) => item.category === request.params.category);
        } else { // category가 반드시 있어야 함.
            functions = [];
        }
    
        response.json({
            status: "success",
            statusText: "function retrieved successfully",
            data: functions
        });
    }
};

exports.post = (request, response) => {
    response.json({
        status: "success",
        statusText: "function retrieved successfully",
        data: [
            {
                id: 0,
                functionType: 'A',
                name: 'function0'
            }
        ]
    });
}