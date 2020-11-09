module.exports = class FunctionItem {
    constructor(
        name = '',
        args = {}, // ex: [[key, value]]
        return_type = '',
        category = 'DataRetrieval',
        shape = 'source', // source, sink, i-data, i-model, y-data, y-model
        description = ''
    ) {
        Object.assign(this, {
            name,
            args,
            return_type,
            category,
            shape,
            description
        });
    }

    static clone({
        name,
        args,
        return_type,
        category,
        shape,
        description
    }) {
        return new FunctionItem(name, args, return_type, category, shape, description);
    }
}