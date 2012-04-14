function _get(id) {
    return document.getElementById(id);
}

function _set(id, value) {
    return document.getElementById(id).value = value;
}

function _getC(name) {
    var elements = document.getElementsByClassName(name);
    if(!!elements.length) {
        return elements[0];
    }
    return undefined;
}

exports.get = _get;
exports.set = _set;
exports.getC = _getC;