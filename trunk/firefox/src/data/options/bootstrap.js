/*
 * Addon side
 */
self.port.on('loadOptions', loadOptions);

function loadOptions(datas) {
	// console.log('bootstrap.js', 'loadOptions', datas.id, datas.options);
	loadOption(datas.id, datas.options);
}

function storeOptions(id, options) {
	// console.log('bootstrap.js', 'storeOptions', id, options);
	self.port.emit('saveOptions', {
		id: id,
		options: options
	});
}


/*
 * Page side
 */
window.addEventListener('message', onMessage, false);

function onMessage(event) {
	var data = JSON.parse(event.data);
	// console.log('bootstrap.js', 'onMessage', data.functionName, data.id, data.options);
	if(data.functionName == 'storeOptions') {
		storeOptions(data.id, data.options);
	}
}

function loadOption(id, options) {
	// console.log('bootstrap.js', 'loadOption', id, options);
	var data = {
		functionName: 'loadOption',
		id: id,
		options: options
	};
	document.defaultView.postMessage(JSON.stringify(data), '*');	
}
