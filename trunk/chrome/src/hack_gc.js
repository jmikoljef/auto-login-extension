////////////////////////////////////////////////////////////////////////////////
// Hack for using click function on anchor and image
////////////////////////////////////////////////////////////////////////////////
HTMLAnchorElement.prototype.click = function() {
	document.location = this.href;
}
HTMLImageElement.prototype.click = function() {
	this.onclick();
}
////////////////////////////////////////////////////////////////////////////////
// End hack
////////////////////////////////////////////////////////////////////////////////

function handleNotification(result) {
	if(!result) return;
	toastIt({content: "Test Notification"});
}

function callBackground(functionName, args, callback, needSender) {
	if(needSender!=true) needSender = false;
	if(!callback) callback = function() {};
	chrome.extension.sendRequest({functionName: functionName, params: args, needSender: needSender}, callback);
}

