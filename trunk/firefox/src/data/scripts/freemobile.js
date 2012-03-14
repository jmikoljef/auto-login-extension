// getElementsByClassName(name)
function _getC(name) {
    var elements = document.getElementsByClassName(name);
    if(!!elements.length) {
        return elements[0];
    }
    return undefined;
}

function _prependHTML(element, html) {
    element.innerHTML = html + element.innerHTML;
}

function execute(credential) {
    _prependHTML(_getC('ident_chiffre2'), '<h1>' + credential.username + '</h1>');
}

self.port.on('execute', execute);
