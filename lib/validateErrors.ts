import { IObjectKeys } from "../types/types";
import typeOf from "../utils/typeOf.js";

const useValidate = function (schema: IObjectKeys, input: {}) {
    if (!schema) {
        throw new TypeError("First parameter Gm Schema Object not found...");
    }

    if (
        typeOf(schema) !== "object" ||
        Object.keys(schema).length === 0 ||
        Object.getPrototypeOf(schema?.data)?.isSchema() !== "__gmSchema__"
    ) {
        throw new TypeError("Error Gm schema not found!");
    }

    if (!input) {
        throw new TypeError("Second parameter Input object data not found...");
    }

    if (typeOf(input) !== "object" || Object.keys(input).length === 0) {
        throw new TypeError("Error input object data");
    }

    if (!schema.data && !schema.length) {
        throw new TypeError("Error Gm Schema Object syntax!");
    }

    const requiredData = schema?.data;
    let errors: IObjectKeys = {};

    for (const key in requiredData) {
        if (key === "isSchema") continue;
        if (input.hasOwnProperty(key)) {
            /**
             * * Check Between Minimum & Maximum
             */
            if (requiredData[key].min && requiredData[key].max) {
                if (requiredData[key].min.min >= requiredData[key].max.max) {
                    throw new TypeError("min must be less than max!");
                }
            }

            /**
             * * REQUIRED CHECKER
             * * required('message')
             */
            if (requiredData[key].required && requiredData[key].required.required) {
                if (input[key] === "" || input[key] === undefined) {
                    errors[key] = requiredData[key].required.message;
                    continue;
                }
            }

            /**
             * * TRIM CHECKER
             * * trim('message')
             */
            if (requiredData[key].trim) {
                if (typeOf(input[key]).trim() === "string") {
                    if (input[key] !== input[key].trim()) {
                        errors[key] = requiredData[key].trim.message;
                        continue;
                    }
                }
            }

            /**
             * * TYPES CHECKER
             * * type('type','message')
             */
            if (requiredData[key].type) {
                if (typeOf(input[key]).trim() !== requiredData[key].type.type) {
                    errors[key] = requiredData[key].type.message;
                    continue;
                }
            }

            /**
             * * MINIMUM CHECKER
             * * min(number,'message')
             */
            if (requiredData[key].min) {
                if (typeOf(input[key]).trim() === "string") {
                    if (input[key].length < requiredData[key].min.min) {
                        errors[key] = requiredData[key].min.message;
                        continue;
                    }
                } else if (typeOf(input[key]).trim() === "number") {
                    if (input[key] < requiredData[key].min.min) {
                        errors[key] = requiredData[key].min.message;
                        continue;
                    }
                }
            }

            /**
             * * MAXIMUM CHECKER
             * * max(number,'message')
             */
            if (requiredData[key].max) {
                if (typeOf(input[key]).trim() === "string") {
                    if (input[key].length > requiredData[key].max.max) {
                        errors[key] = requiredData[key].max.message;
                        continue;
                    }
                } else if (typeOf(input[key]).trim() === "number") {
                    if (input[key] > requiredData[key].max.max) {
                        errors[key] = requiredData[key].max.message;
                        continue;
                    }
                }
            }

            /**
             * * ISEMAIL CHECKER
             * * isEmail('message')
             */
            if (requiredData[key].isEmail && requiredData[key].isEmail.isEmail) {
                if (typeOf(input[key]).trim() === "string") {
                    const emailRegex =
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if (!input[key].toLowerCase().match(emailRegex)) {
                        errors[key] = requiredData[key].isEmail.message;
                        continue;
                    }

                    if (requiredData[key].isEmail.support && typeOf(requiredData[key].isEmail.support) === "array") {
                        const support = requiredData[key].isEmail.support;
                        const email = input[key].split("@")[1];
                        if (!support.includes(`@${email}`)) {
                            errors[key] = `We only support ${support.toString()}`;
                        }
                    }
                }
            }

            /**
             * * PATTERN CHECKER
             * * pattern(pattern,'message')
             */
            if (requiredData[key].pattern) {
                if (typeOf(requiredData[key].pattern.pattern).trim() === "regexp") {
                    // const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})?/);
                    const regex = requiredData[key].pattern.pattern;
                    if (!input[key].match(regex)) {
                        errors[key] = requiredData[key].pattern.message;
                        continue;
                    }
                }
            }

            /**
             * * MATCH CHECKER
             * * match('input','message')
             */
            if (requiredData[key].match) {
                if (requiredData[requiredData[key].match.match] && requiredData[key].match.match !== key) {
                    if (
                        input[key].toLowerCase().trim() !== input[requiredData[key].match.match].toLowerCase().trim() ||
                        input[key].trim() === ""
                    ) {
                        errors[key] = requiredData[key].match.message;
                    }
                } else {
                    throw new TypeError(`${requiredData[key].match.match} input not found!`);
                }
            }
        } else {
            throw new TypeError(`${key} input not found`);
        }
    }

    return Object.keys(errors).length !== 0 ? errors : false;
};

export default useValidate;
