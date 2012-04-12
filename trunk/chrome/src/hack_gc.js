HTMLAnchorElement.prototype.click = function() {
	document.location = this.href;
}
HTMLImageElement.prototype.click = function() {
	this.onclick();
}
