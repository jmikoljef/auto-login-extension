const NUMBER_CELLS = document.evaluate('//table[@id="pave-saisie-code"]//td[@onclick!=""]', document, null, XPathResult.ANY_TYPE, null);
const USERNAME_INPUT = _getX('//input[@name="CCPTE"]');
const PASSWORD_INPUT = _getX('//input[@name="CCCRYC"]');
const BUTTON_INPUT = _getX('//a[@tabindex="28"]');

const VAL_POS = new Array();

function _getX(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
}

function extractNumbers(texte) {
    return texte.replace(/[^0-9]*([0-9]+)[^0-9]*/, '$1');
}

function parseNumbers() {
	var td = undefined;
	while(td = NUMBER_CELLS.iterateNext()) {
		var number = extractNumbers(td.firstChild.textContent);
		VAL_POS[number]=td;
	}
}

function clickOnNumbers(password) {
    if(VAL_POS.length == 10) {
        for(var i = 0 ; i < password.length ; i++) {
            var v = password.charAt(i);
            VAL_POS[v].click();
        }
    } else {
        console.error("Discovering incomplete");
    }
}

function execute(credential) {
	parseNumbers();
    if(!!USERNAME_INPUT) {
        USERNAME_INPUT.value = credential.username;
        clickOnNumbers(credential.password);
        BUTTON_INPUT.click();
    }
}

