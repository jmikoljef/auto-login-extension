////////////////////////////////////////////////////////////////////////////////
// Must be redefined for each browser
////////////////////////////////////////////////////////////////////////////////
function storeOptions(id, options) {
	// console.log('communication.js', 'storeOptions', id, options);
	var data = {
		functionName: 'storeOptions',
		id:id,
		options:options
	};
	window.postMessage(JSON.stringify(data), '*');
}

////////////////////////////////////////////////////////////////////////////////
// browser specifics
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('message', onMessage, false);

function onMessage(event) {
	var data = JSON.parse(event.data);
	// console.log('communication.js', 'onMessage', data.functionName, data.id, data.options);
	if(data.functionName == 'loadOption') {
		loadOption(data.options, data.id);
	}
}