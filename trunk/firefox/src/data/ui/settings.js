const ACTIVATION = _get('activation');
const CREDENTIAL = _get('credential');

function _get(id) {
    return document.getElementById(id);
}

function _element(tagName) {
	return document.createElement(tagName);
}

function _text(text) {
	return document.createTextNode(text);
}

function _div(className) {
	var e = _element('div');
	e.class = className;
	return e;
}

function _label(for, text) {
	var e = _element('label');
	e.for = for;
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

function _activation(config, parent) {
	var div = _div('checkbox');
	var label = _label(config.id + '-activation', config.label + ' :');
	div.appendChild(label);
	var input = _input(config.id + '-activation', 'checkbox', true);
	div.appendChild(input);
	parent.appendChild(div);
}

function _username(config, parent) {
	var div = _div('textfield');
	var label = _label(config.id + '-username', 'Login :');
	div.appendChild(label);
	var input = _input(config.id + '-username', 'text', '');
	div.appendChild(input);
	parent.appendChild(div);
}

function _password(config, parent) {
	var div = _div('textfield');
	var label = _label(config.id + '-password', 'Mot de passe :');
	div.appendChild(label);
	var input = _input(config.id + '-password', 'password', '');
	div.appendChild(input);
	parent.appendChild(div);
}

function _button(config, parent) {
	var div = _div('button');
	var input = _input(config.id + '-button', 'button', 'Modifier');
	div.appendChild(input);
	div.addEventListener('click', function (){ _click(config); });
	parent.appendChild(div);
}

function _click(config) {
	var username = _get(config.id + '-username');
	var password = _get(config.id + '-password');
    if(!!username) {
		changeCredential(config, username, password);
    } else {
        console.warn('username empty for: ' + config.siteUrl);
    }
}

function _activation(config) {
	_activation(config, ACTIVATION);
}

function _credential(config) {
	var e = _div('label');
	var t = _text(config.label);
	e.appendChild(t);
	CREDENTIAL.appendChild(e);
	_username(config, CREDENTIAL);
	_password(config, CREDENTIAL);
	_button(config, CREDENTIAL);
}

function changeCredential(config, username, password) {
    var credential = {
        url: config.siteUrl,
        username: username,
        password: password
    };
    self.port.emit('changeCredential', credential);
}

function main(configs) {
	for(var id in configs) {
		var config = configs[id];
		_activation(config);
		_credential(config);
	}
}
self.port.on('main', main);
