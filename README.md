# **gm-validator**

## _A simple library to validate Data._

## _Easy to use just a few steps_

## _Easy to custom error message_

### Esay install and use

## **Install**

Install the library with `npm install gm-validate`

## **Use**

```javascript
import gm from "gm-validate";
```

### Create required validation schema for validate input data

## In this version will use new keyword

```javascript
import gm, { schema, useValidate } from "gm-validate";

const form = schema({
    name: new gm()
        .required()
        .type("string")
        .min(3)
        .pattern(/^[a-zA-Z]+$/)
        .collect(),
    age: new gm()
        .required()
        .type("number")
        .pattern(/^[0-9]+$/)
        .min(18)
        .max(60)
        .collect(),
    email: new gm().required().isEmail().collect(),
    password: new gm().required().min(6).trim().collect(),
});
// collect method in end of the chain to collect required data .
```

### **Create required validation schema with custom message and some options**

### _*Exsample* for signup form_

```javascript
import gm, { useValidate, schema } from "gm-validate";
// schema
const regex = /^[a-zA-Z]+$/g;
const signupValdite = schema({
    first_name: new gm()
        // Message if field is required
        .required("Please fill input First Name")
        // choose field type
        .type("string")
        // minimum field length is 3 with custom message
        .min(3, "First name must be 3 character or more")
        // regular expression to custom the input pattern
        .pattern(/^[a-zA-Z]+$/g, "Numbers and symbols not support in input field")
        .collect(),
    last_name: new gm()
        .required("Please fill input Last Name")
        .pattern(regex, "Numbers and symbol not support in input field")
        .type("string")
        .min(3)
        .collect(),
    age: new gm().required("Please fill input Age").type("number").min(18, "Age must be +18").collect(),
    email: new gm()
        .required("Please fill input Email")
        // Support email domain
        .isEmail("please provide a valid email", ["@gmail.com", "@gmail.io", "@hotmail.com"])
        // Chech if field has space, you can write error message
        .trim()
        .collect(),
    password: new gm().required("Please fill input Password").min(6).trim().collect(),
    // use match method to check if current field like password field
    confirm_password: new gm().match("password", "Password not match").collect(),
});

// Signup Form
const form = {
    first_name: "mohamed",
    last_name: "ali",
    age: 30,
    email: "hamada@gmail.io",
    password: "123456",
    confirm_password: "123456",
};

// Validate and return error
const signupError = useValidate(signupValdite, form);
```

> ## **Method**

-   `schema(input : {})`

-   `useValidate(gmSchema : {}, input : {})`

-   `required(message : string)`

-   `type(type : string, message : string)`

-   `min(number : number, message : string)`

-   `max(number : number, message : string)`

-   `isEmail(message : string , support : [])`

-   `trim(message : string )`

-   `pattern(pattern : RegExp , message : string)`

-   `match(field : string , message : string)`

-   `isColor(message : string)`

-   `isFile(options{extension:[] , maxSize:number})`

-   `collect( )`
