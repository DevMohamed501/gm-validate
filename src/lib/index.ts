import { IObjectKeys } from "../types/types.js";
import typeOf from "../utils/typeOf.js";

export const gm = function () {
    let inp: IObjectKeys = {};

    /**
     * * Check Type Error And Send Message If Found Error
     */
    const setErrorMessageType = (_message: string | {}, input: string) => {
        if (typeOf(_message) !== "string") {
            throw new TypeError("Error message must be String ");
        }
    };

    const validate = {
        /**
         * * Check If Required Needed
         */
        required(_Message: string = "Input is required") {
            setErrorMessageType(_Message, "Required");

            let val = { required: true, message: _Message };
            inp.required = val;
            return validate;
        },

        /**
         * * Check If Type Needed
         */
        type(_type: string, _Message: string = `Input not a type ${_type}!`) {
            if (!_type) {
                throw new TypeError("Type parameter is missing");
            }

            if (typeOf(_type) !== "string") {
                throw new TypeError("Type must be String");
            }

            setErrorMessageType(_Message, "Type");

            let val = { type: _type, message: _Message };
            inp.type = val;
            return validate;
        },

        /**
         * * Check If Min Length Needed
         */
        min(_number: number, _Message = `Minimum is ${_number}`) {
            if (!_number) {
                throw new TypeError("Min parameter is missing");
            }

            if (typeOf(_number) !== "number") {
                throw new TypeError("Min parameter must be Number");
            }

            setErrorMessageType(_Message, "Min");

            let val = { min: _number, message: _Message };
            inp.min = val;
            return validate;
        },

        /**
         * * Check If Max Length Needed
         */
        max(_number: number, _Message = `Maximum is ${_number}`) {
            if (!_number) {
                throw new TypeError("Max parameter is missing");
            }

            if (typeOf(_number) !== "number") {
                throw new TypeError("Max parameter must be Number");
            }
            setErrorMessageType(_Message, "Max");

            let val = { max: _number, message: _Message };
            inp.max = val;

            return validate;
        },

        /**
         * * Check If Email Needed
         */
        isEmail(_Message: String = "Email not valid", _support?: string[]) {
            setErrorMessageType(_Message, "isEmail");
            let val: any = { isEmail: true, message: _Message };
            if (_support && typeOf(_support) === "array") {
                val.support = _support;
            }

            inp.isEmail = val;
            return validate;
        },

        /**
         * * Check If Trim Needed
         */
        trim(_Message: string = "Input not support start or end space") {
            setErrorMessageType(_Message, "Trim");

            let val = { trim: true, message: _Message };
            inp.trim = val;
            return validate;
        },

        /**
         * * Check Between tow value is matching Or Not
         */
        pattern(_pattern: RegExp, _Message: string = `Pattern not match`) {
            setErrorMessageType(_Message, "match");

            let val = { pattern: _pattern, message: _Message };
            inp.pattern = val;
            return validate;
        },

        /**
         * * Check Between tow value is matching Or Not
         */
        match(_field: string, _Message: string = `${_field} not match`) {
            setErrorMessageType(_Message, "match");

            let val = { match: _field, message: _Message };
            inp.match = val;
            return validate;
        },

        /**
         * * Collect All Data Needed To Check IF The Input Like This Data
         */
        collect() {
            return inp;
        },
    };

    /**
     * * Return Checker Functions
     */
    return validate;
};
