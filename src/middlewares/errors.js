import EnumErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
    req.logger.error(error.cause);
    switch(error.code){
        case EnumErrors.INVALID_TYPES_ERROR:
            res.status(400).send({status: 'error', error: error.name, cause: error.cause});
            break;

        case EnumErrors.DATABASES_ERROR:
            res.status(400).send({status: 'error', error: error.name, cause: error.cause});
            break;

        default:
            res.send({status: 'error', error: 'Unhandled error'})
            break;

    }

}