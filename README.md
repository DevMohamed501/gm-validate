# **gm-validator**

## _A simple library to validate Data._

### Esay install and use

> ## **Install**

Install the library with `npm install gm-validate`

> ## **Use**

```javascript
import Gm from "gm-validate";
```

### Create required validation schema for validate input data

### _Exsample_ :

```javascript
import gm, { schema, useValidate } from "gm-validate";

//Create validate schema for login email
const loginValidate = schema({
    email: gm().required().isEmail().trim().collect(),
    password: gm().required().min(6).trim().collect(),
});
// Use collect method in end of the chain to collect required data .
// For exsample we need validate form data like .
const form = {
    email: "abcdef", // error
    password: "", // error
};
//-----------------------------------------
const form = {
    email: "hamada@gmail.io", // correct
    password: "", // correct
};
// Use useValidate to validate data and return error if found .
const loginError = useValidate(loginValidate, form);

// in this case will return error message as object like .

// ->{ email: "Email not valid", password: "Input is required" };

// error message built-in in Gm but youcan custom the error message .
```

### Create required validation schema with custom message and some options

### _Exsample_ for signup form

```javascript
import gm, { useValidate, schema } from "gm-validate";
// schema
const regex = /^[a-zA-Z]+$/g;
const signupValdite = schema({
    first_name: gm()
        .required("Please fill input First Name") // Message if field is required
        .type("string") // choose field type
        .min(3, "First name must be 3 character or more") // minimum field length is 3 with custom message
        .pattern(/^[a-zA-Z]+$/g, "Numbers and symbol not support in input field") // regular expression to custom the input pattern
        .collect(),
    last_name: gm()
        .required("Please fill input Last Name")
        .pattern(regex, "Numbers and symbol not support in input field")
        .type("string")
        .min(3)
        .collect(),
    age: gm().required("Please fill input Age").type("number").min(18, "Age must be +18").collect(),
    email: gm()
        .required("Please fill input Email")
        .isEmail("please provide a valid email", ["@gmail.com", "@gmail.io", "@hotmail.com"]) // Support email domain
        .trim() // Chech if field has space, you can write error message
        .collect(),
    password: gm().required("Please fill input Password").min(6).trim().collect(),
    confirm_password: gm().match("password", "Password not match").collect(), // use match to check if current like password field
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

-   `collect( )`
