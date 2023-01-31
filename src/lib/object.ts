import { IObjectKeys } from "../types/types";
import typeOf from "../utils/typeOf.js";

/**
 * * Schema To Collect The Valid Data Need To Check Input Data Before
 */
const Schema = function (inputs: {}): {} {
    let handleData: IObjectKeys | any = {};

    const schemaCheck = {
        isSchema: () => {
            return "__gmSchema__";
        },
    };

    Object.setPrototypeOf(handleData, schemaCheck);

    if (typeOf(inputs) === "object" && Object.keys(inputs).length <= 0) {
        throw new TypeError("Error Schema Object is empty");
    }

    if (Object.keys(inputs).length > 0 && inputs.constructor === Object && typeof arguments[0] === "object") {
        for (const key in inputs) {
            handleData[key] = inputs[key];
        }

        return { data: handleData, length: Object.keys(inputs).length };
    } else {
        throw new TypeError("Schema parameter must be object with Key and Value");
    }
};

export default Schema;
