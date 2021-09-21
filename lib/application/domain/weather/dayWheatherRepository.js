'use strict';
const crudBaseClass = require('../utils/crudBaseClass');


module.exports = class extends crudBaseClass{
    constructor() {
        super();
    }

    bulkInsert(weatherData,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    bulkUpdate(weatherDetails,dbName) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

};
