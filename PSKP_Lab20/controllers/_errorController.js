module.exports = class ErrorController {

    sendError = async (res, err) => {
        if (err)
            res.status(409).json({
                name: err?.name,
                code: err.code,
                detail: err.original?.detail,
                message: err.message
            });
        else
            this.sendCustomError(res, 409, err);
    }


    sendCustomError = async (res, code, message) => {
        res.status(code).json({ code, message });
    }
}