import { IObjectKeys, FileOptions } from "../types/types.js";
import typeOf from "../utils/typeOf.js";

class Gm {
    private inp: IObjectKeys = {};

    /**
     * * Check Type Error And Send Message If Found Error
     */
    private setErrorMessageType = (_message: string | {}, input: string) => {
        if (typeOf(_message) !== "string") {
            throw new TypeError("Error message must be String ");
        }
    };

    /**
     * * Check If Required Needed
     */
    public required(_Message: string = "Input is required") {
        this.setErrorMessageType(_Message, "Required");

        let val = { required: true, message: _Message };
        this.inp.required = val;
        return this;
    }

    /**
     * * Check If Type Needed
     */
    public type(_type: string, _Message: string = `Input not a type ${_type}!`) {
        if (!_type) {
            throw new TypeError("Type parameter is missing");
        }

        if (typeOf(_type) !== "string") {
            throw new TypeError("Type must be String");
        }

        this.setErrorMessageType(_Message, "Type");

        let val = { type: _type, message: _Message };
        this.inp.type = val;
        return this;
    }

    /**
     * * Check If Min Length Needed
     */
    public min(_number: number, _Message = `Minimum is ${_number}`) {
        if (!_number) {
            throw new TypeError("Min parameter is missing");
        }

        if (typeOf(_number) !== "number") {
            throw new TypeError("Min parameter must be Number");
        }

        this.setErrorMessageType(_Message, "Min");

        let val = { min: _number, message: _Message };
        this.inp.min = val;
        return this;
    }

    /**
     * * Check If Max Length Needed
     */
    public max(_number: number, _Message = `Maximum is ${_number}`) {
        if (!_number) {
            throw new TypeError("Max parameter is missing");
        }

        if (typeOf(_number) !== "number") {
            throw new TypeError("Max parameter must be Number");
        }
        this.setErrorMessageType(_Message, "Max");

        let val = { max: _number, message: _Message };
        this.inp.max = val;

        return this;
    }

    /**
     * * Check If Email Needed
     */
    public isEmail(_Message: String = "Email not valid", _support?: string[]) {
        this.setErrorMessageType(_Message, "isEmail");
        let val: any = { isEmail: true, message: _Message };
        if (_support && typeOf(_support) === "array") {
            val.support = _support;
        }

        this.inp.isEmail = val;
        return this;
    }

    /**
     * * Check If isColor Needed
     */
    public isColor(_Message: String = "Color not valid") {
        this.setErrorMessageType(_Message, "isColor");
        let val: any = { isColor: true, message: _Message };

        this.inp.isColor = val;
        return this;
    }

    /**
     * * Check If isFile Needed
     */

    public isFile(
        // _Message: String = "File not valid",
        options: FileOptions = {
            extension: undefined,
            maxSize: 0,
        }
    ) {
        // this.setErrorMessageType(_Message, "isFile");
        let val: any = { isFile: true, message: "", option: { ...options } };

        this.inp.isFile = val;
        return this;
    }

    /**
     * * Check If Trim Needed
     */
    public trim(_Message: string = "Input not support start or end space") {
        this.setErrorMessageType(_Message, "Trim");

        let val = { trim: true, message: _Message };
        this.inp.trim = val;
        return this;
    }

    /**
     * * Check Between tow value is matching Or Not
     */
    public pattern(_pattern: RegExp, _Message: string = `Pattern not match`) {
        this.setErrorMessageType(_Message, "match");

        let val = { pattern: _pattern, message: _Message };
        this.inp.pattern = val;
        return this;
    }

    /**
     * * Check Between tow value is matching Or Not
     */
    public match(_field: string, _Message: string = `${_field} not match`) {
        this.setErrorMessageType(_Message, "match");

        let val = { match: _field, message: _Message };
        this.inp.match = val;
        return this;
    }

    /**
     * * Collect All Data Needed To Check IF The Input Like This Data
     */
    public collect() {
        return this.inp;
    }

    /**
     * * Return Checker Functions
     */
}

const gm = Gm;

export default gm;
