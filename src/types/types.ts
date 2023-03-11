export interface IObjectKeys {
    [key: string]: {} | [];
}

export interface GmType {
    required(_Message?: string): any;
    type(_type: string, _Message?: string): any;
    min(_number: number, _Message?: string): any;
    max(_number: number, _Message?: string): any;
    isEmail(_Message?: string, _support?: string[]): any;
    trim(_Message?: string): any;
    match(_input: string, _Message?: string): any;
    pattern(_pattern: RegExp, _Message?: string): any;
    collect(): any;
}

export enum Types {
    string = "string",
    number = "number",
    boolean = "boolean",
    object = "object",
    array = "array",
    function = "function",
    regex = "regex",
    date = "date",
}

export interface FileOptions {
    extension?: string[];
    maxSize?: number;
}
