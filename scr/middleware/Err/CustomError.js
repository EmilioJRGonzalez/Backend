export default class CustomError {
    static createError({ name = "Error", cause, message = "Message", code = 1 }) {
        const error = new Error(message);
        error.name = name;
        error.code = code;
        error.cause = cause ? new Error(cause) : null
        console.debug("CUSTOMERROR", message, name, code, cause)
        
        throw error;
    }
}
