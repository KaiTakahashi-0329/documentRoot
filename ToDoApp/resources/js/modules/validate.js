const isNull = (text) => {
    const whitespace = /\s/;
    const isWhitespace = whitespace.test(text);

    const string = /\S/
    const isString = string.test(text);

    if(!text || isWhitespace && !isString) return false
    return true;
}

export { isNull };
