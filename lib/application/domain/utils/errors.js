class AppError extends Error {

    constructor(code, httpStatus, message, language, data = {}, stack, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }


        message = message;
        this.stack = stack || this.stack;
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
        this.data = data;

    }

};
class InternalServerError extends AppError {
    constructor(err) {
        super(500, 500, err.message, undefined, undefined, err.stack);
    }
};

class PageNotFound extends AppError {
    constructor() {
        super(404, 404, "Page Not Found")
    }
}

class InputValidationError extends AppError {
    constructor(message) {
        super(-1, 400, message);
    }
}


class BadRequest extends AppError {
    constructor(message) {
        super(400, 400, message)
    }
}
class itemInfoNotFound extends AppError {
    constructor(item) {
        super(403, 403, `${item+" info not found"}`)
    }
}

class reqValidationError extends AppError {
    constructor(item) {
        super(403, 403, `${item+"already exist"}`)
    }
}

module.exports = {
    AppError,
    InternalServerError,
    PageNotFound,
    BadRequest,
    InputValidationError,
    itemInfoNotFound,
    reqValidationError,

};
