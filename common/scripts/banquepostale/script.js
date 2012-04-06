const IMG_VAL = {
	"7ee3e46eecb90af753d79c34db2e79dc9b26f8a3": 1,
	"fab83026abf0715323778f98e5ad02a34405c5f2": 8,
	"e5103759510a22ed2af82a87c035f5b56c4dd89f": 9,
	"fbf383163f049a337ded222ca5967c80e8b25976": 4,
	"d333904d5a1999c810d8f647aeb67e5da2dda7d9": 2,
	"7d48b914653945e3046fa313eff2b86bff00d9a5": 5,
	"f84f48d21bb315143afa757e03c793e1f4dcf6e2": 0,
	"3723149078045b8ce715ed49bc913081ccbe8906": 6,
	"a4bd01f28f0f4765a7d9dc0eff4806e537717d63": 7,
	"597176badd014337bd3ccf926e95b7effc166dda": 3
};
const VAL_POS = new Array();


const USERNAME_INPUT_ID = 'val_cel_dentifiant';
const PASSWORD_INPUT_ID = 'cs';

function _get(id) {
	return document.getElementById(id);
}

// getElementById(id).value = value
function _set(id, value) {
	return document.getElementById(id).value = value;
}

function parseImgs() {
var img_val = "";
	for(var i = 0 ; i <= 9 ; i++) {
		var img = _get('val_cel_' + i).firstChild.firstChild;
		var b64 = img2base64(img);
		var sha1 = SHA1(b64);
		var val = IMG_VAL[sha1];
		VAL_POS[val] = i;
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
	_set(USERNAME_INPUT_ID, credential.username);
	_set(PASSWORD_INPUT_ID, getPositionsFromValue(credential.password));
	document.forms["formAccesCompte"].submit();
}

parseImgs();
