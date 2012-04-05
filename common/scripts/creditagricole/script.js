const USERNAME_INPUT = _getX('//input[@name="CCPTE"]');
const PASSWORD_INPUT = _getX('//input[@name="CCCRYC"]');
const BUTTON_INPUT = _getX('//a[tabindex="28"]');

const VAL_POS = new Array();

function _getX(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
}

function extractNumbers(texte) {
    return texte.replace(/[^0-9]*([0-9]+)[^0-9]*/, '$1');
}

function parseNumbers() {
	var result = document.evaluate('//table[@id="pave-saisie-code"]//td[@onclick!=""]', document, null, XPathResult.ANY_TYPE, null);
	var td = result.iterateNext();
	while(!!td) {
		var position = extractNumbers(td.attributes[0].nodeValue);
		var number = extractNumbers(td.firstChild.textContent);
		VAL_POS[number]=position;
        console.log(number + ' => ' + position);
		td = result.iterateNext();
	}
}

function getPositionsFromValue(value) {
    var positions = '';
    for(var i = 0 ; i < value.length ; i++) {
        var v = value.charAt(i);
        var p = VAL_POS[v];
        positions += p;
    }
    return positions;
}

function execute(credential) {
    USERNAME_INPUT.value = credential.username;
    PASSWORD_INPUT.value = getPositionsFromValue(credential.password);
    BUTTON_INPUT.click();
}

parseNumbers();
self.port.on('execute', execute);
