import { IObjectKeys } from "../types/types";
import typeOf from "../utils/typeOf.js";
import isNumber from "./isNumber.js";
import checkColor from "./isColor.js";
import formatFileSize from "../utils/sizeForma.js";

const useValidate = function (schema: IObjectKeys, form: {}) {
    if (!schema) {
        throw new TypeError("First parameter Gm Schema Object not found...");
    }
    if (
        typeOf(schema) !== "object" ||
        Object.keys(schema).length === 0 ||
        !Object.getPrototypeOf(schema?.data)?.isSchema
    ) {
        throw new TypeError("Error Gm schema not found!");
    }

    if (!form) {
        throw new TypeError("Second parameter form object data not found...");
    }

    if (typeOf(form) !== "object" || Object.keys(form).length === 0) {
        throw new TypeError("Error form object data");
    }

    if (!schema.data && !schema.length) {
        throw new TypeError("Error Gm Schema Object syntax!");
    }

    const requiredData = schema?.data;
    let errors: IObjectKeys = {};

    for (const key in requiredData) {
        if (key === "isSchema") continue;
        if (Object.prototype.hasOwnProperty.call(form, key)) {
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
                if (form[key] === "" || form[key] === undefined) {
                    errors[key] = requiredData[key].required.message;
                    continue;
                }
            }

            /**
             * * TRIM CHECKER
             * * trim('message')
             */
            if (requiredData[key].trim) {
                if (!requiredData[key].required && form[key] === "") continue;
                if (typeOf(form[key]).trim() === "string") {
                    if (form[key] !== form[key].trim()) {
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
                if (!requiredData[key].required && form[key] === "") continue;
                if (requiredData[key].type.type === "number") {
                    if (!isNumber(form[key])) {
                        errors[key] = requiredData[key].type.message;
                        continue;
                    }
                } else if (typeOf(form[key]).trim() !== requiredData[key].type.type) {
                    errors[key] = requiredData[key].type.message;
                    continue;
                }
            }

            /**
             * * MINIMUM CHECKER
             * * min(number,'message')
             */
            if (requiredData[key].min) {
                if (!requiredData[key].required && form[key] === "") continue;
                if (typeOf(form[key]) === "number") {
                    if (form[key] < requiredData[key].min.min) {
                        errors[key] = requiredData[key].min.message;
                        continue;
                    }
                } else if (
                    typeOf(form[key]).trim() === "string" ||
                    typeOf(form[key]).trim() === "array" ||
                    typeOf(form[key]).trim() === "object"
                ) {
                    if (typeOf(form[key]).trim() === "object") {
                        if (Object.keys(form[key]).length < requiredData[key].min.min) {
                            errors[key] = requiredData[key].min.message;
                            continue;
                        }
                    } else if (requiredData[key].type && requiredData[key].type.type === "number") {
                        const value = form[key];
                        if (isNumber(value)) {
                            if (parseInt(value) < requiredData[key].min.min) {
                                errors[key] = requiredData[key].min.message;
                                continue;
                            }
                        }
                    } else {
                        if (form[key].length < requiredData[key].min.min) {
                            errors[key] = requiredData[key].min.message;
                            continue;
                        }
                    }
                } else {
                    if (form[key] < requiredData[key].min.min) {
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
                if (!requiredData[key].required && form[key] === "") continue;
                if (typeOf(form[key]) === "number") {
                    if (form[key] > requiredData[key].max.max) {
                        errors[key] = requiredData[key].max.message;
                        continue;
                    }
                } else if (
                    typeOf(form[key]).trim() === "string" ||
                    typeOf(form[key]).trim() === "array" ||
                    typeOf(form[key]).trim() === "object"
                ) {
                    if (typeOf(form[key]).trim() === "object") {
                        if (Object.keys(form[key]).length > requiredData[key].max.max) {
                            errors[key] = requiredData[key].max.message;
                            continue;
                        }
                    } else if (requiredData[key].type && requiredData[key].type.type === "number") {
                        const value = form[key];
                        if (isNumber(value)) {
                            if (parseInt(value) > requiredData[key].max.max) {
                                errors[key] = requiredData[key].max.message;
                                continue;
                            }
                        }
                    } else {
                        if (form[key].length > requiredData[key].max.max) {
                            errors[key] = requiredData[key].max.message;
                            continue;
                        }
                    }
                } else {
                    if (form[key] > requiredData[key].max.max) {
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
                if (!requiredData[key].required && form[key] === "") continue;
                if (typeOf(form[key]).trim() === "string") {
                    const emailRegex =
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if (!form[key].toLowerCase().match(emailRegex)) {
                        errors[key] = requiredData[key].isEmail.message;
                        continue;
                    }

                    if (requiredData[key].isEmail.support && typeOf(requiredData[key].isEmail.support) === "array") {
                        const support = requiredData[key].isEmail.support;
                        const email = form[key].split("@")[1];
                        if (!support.includes(`@${email}`)) {
                            errors[key] = `We only support ${support.toString()}`;
                        }
                    }
                }
            }

            /**
             * * ISCOLOR CHECKER
             * * isColor('message')
             */
            if (requiredData[key].isColor && requiredData[key].isColor.isColor) {
                if (!requiredData[key].required && form[key] === "") continue;
                if (typeOf(form[key]).trim() === "string") {
                    if (!checkColor(form[key])) {
                        errors[key] = requiredData[key].isColor.message;
                        continue;
                    }
                }
            }

            /**
             * * PATTERN CHECKER
             * * pattern(pattern,'message')
             */
            if (requiredData[key].pattern) {
                if (!requiredData[key].required && form[key] === "") continue;
                if (typeOf(requiredData[key].pattern.pattern).trim() === "regexp") {
                    // const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})?/);
                    const regex = requiredData[key].pattern.pattern;
                    if (!regex.test(form[key])) {
                        errors[key] = requiredData[key].pattern.message;
                        continue;
                    }
                }
            }

            /**
             * * ISFILE CHECKER
             * * isFile('message', options)
             */
            if (requiredData[key].isFile) {
                if (!requiredData[key].required && form[key] === "") continue;
                const exte = requiredData[key].isFile.option.extension;
                const size = requiredData[key].isFile.option.maxSize;
                const files = form[key];

                if ((exte && exte.length > 0 && files.length > 0) || (size > 0 && files.length > 0)) {
                    for (let x = 0; x < files.length; x++) {
                        let e = files[x].mimetype.split("/")[1];
                        let s = files[x].size;

                        if (!exte.includes(e)) {
                            errors[key] = `Extension (.${e}) not support!`;
                            break;
                        }
                        if (s > size) {
                            errors[key] = `File ${
                                files[x].originalname
                            } size is two larg, max size is (${formatFileSize(size)})`;
                            break;
                        }
                    }
                }

                continue;
            }

            /**
             * * MATCH CHECKER
             * * match('input','message')
             */
            if (requiredData[key].match) {
                if (requiredData[requiredData[key].match.match] && requiredData[key].match.match !== key) {
                    if (
                        form[key].toLowerCase().trim() !== form[requiredData[key].match.match].toLowerCase().trim() ||
                        form[key].trim() === ""
                    ) {
                        errors[key] = requiredData[key].match.message;
                    }
                } else {
                    throw new TypeError(`${requiredData[key].match.match} input not found!`);
                }
            }
        } else {
            if (!requiredData[key].required && !form[key]) continue;
            throw new TypeError(`${key} input not found`);
        }
    }

    return Object.keys(errors).length !== 0 ? errors : false;
};

export default useValidate;
