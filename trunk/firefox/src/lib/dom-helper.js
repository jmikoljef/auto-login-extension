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

function _element(tagName) {
	return document.createElement(tagName);
}

function _text(text) {
	return document.createTextNode(text);
}

function _div(className) {
	var e = _element('div');
	e.className = className;
	return e;
}

function _label(forTag, text) {
	var e = _element('label');
	e.for = forTag;
	var t = _text(text);
	e.appendChild(t);
	return e;
}

function _input(id, type, value) {
	var e = _element('input');
	e.id = id;
	e.name = id;
	e.type = type;
	e.value = value;
	return e;
}

exports.get = _get;
exports.set = _set;
exports.getC = _getC;
// to be continued
