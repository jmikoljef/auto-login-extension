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

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

function changeCredential(script, username, password) {
    var credential = {
        url: script.site,
        username: username,
        password: password
    };
    self.port.emit('changeCredential', credential);
}

function _onClick(script) {
	var username = _get(script.id + '-username').value;
	var password = _get(script.id + '-password').value;
    if(!!username) {
		changeCredential(script, username, password);
    } else {
        console.warn('username empty for: ' + script.site);
    }
}

function _activation(script, parent) {
	var div = _div('checkbox');
	var label = _label(script.id + '-activation', script.label + ' :');
	div.appendChild(label);
	var input = _input(script.id + '-activation', 'checkbox', true);
	div.appendChild(input);
	parent.appendChild(div);
}

function _siteLabel(script, parent) {
	var div = _div('label');
	var text = _text(script.label);
	div.appendChild(text);
	parent.appendChild(div);
}

function _username(script, parent) {
	var div = _div('textfield');
	var label = _label(script.id + '-username', 'Login :');
	div.appendChild(label);
	var input = _input(script.id + '-username', 'text', '');
	div.appendChild(input);
	parent.appendChild(div);
}

function _password(script, parent) {
	var div = _div('textfield');
	var label = _label(script.id + '-password', 'Mot de passe :');
	div.appendChild(label);
	var input = _input(script.id + '-password', 'password', '');
	div.appendChild(input);
	parent.appendChild(div);
}

function _button(script, parent) {
	var div = _div('button');
	var input = _input(script.id + '-button', 'button', 'Modifier');
	div.appendChild(input);
	div.addEventListener('click', function (){ _onClick(script); });
	parent.appendChild(div);
}

function _blocActivation(script) {
	var div = _div('activation');
	_activation(script, div);
	_get('activation').appendChild(div);
}

function _blocCredential(script) {
	var div = _div('credential');
	_siteLabel(script, div);
	_username(script, div);
	_password(script, div);
	_button(script, div);
	_get('credential').appendChild(div);
}

function main(scripts) {
	for(var id in scripts) {
		var script = scripts[id];
		_blocActivation(script);
		_blocCredential(script);
	}
}
self.port.on('main', main);
