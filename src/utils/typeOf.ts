function typeOf(input: any) {
    const regexObject: string = Object.prototype.toString.call(input).toLowerCase();
    const typeOfRegex: RegExp = /\[object (.*)]/g;
    const type = typeOfRegex.exec(regexObject)![1];

    return type;
}

export default typeOf;
