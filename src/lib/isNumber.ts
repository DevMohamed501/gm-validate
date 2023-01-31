const isNumber = (value: string) => {
    return new RegExp(`^[+-]?([0-9]*['.'])?[0-9]+$`).test(value);
};

export default isNumber;
