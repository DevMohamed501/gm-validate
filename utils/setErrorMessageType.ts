import typeOf from "./typeOf.js";

const setErrorMessageType = (message: string | {}) => {
    if (typeOf(message) !== "string" && typeOf(message) !== "object") {
        throw TypeError("TypeError error message must be String or Object type");
    }
};

export default setErrorMessageType;
