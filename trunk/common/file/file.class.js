function File(url, resolveUrl) {
	this.content;
	this.json;
	this.url;

	if(resolveUrl==undefined) {
		this.url = url;
	} else {
		this.url = resolveUrl(url);
	}
}
File.prototype.open = function() {
	this.close();
	var xhr = new XMLHttpRequest();
	xhr.open("GET", this.url, false);
	try {
		xhr.send();
		if(xhr.readyState != 4) return false;
		this.content = xhr.responseText;
	} catch(e) {
		return false;
	}
	return true;
};
File.prototype.close = function() {
	this.content = undefined;
	this.json = undefined
};
File.prototype.getContent = function() {
	return this.content;
};
File.prototype.getJsonContent = function() {
	if(this.json==undefined) {
		this.json = eval("("+this.content+")");
	}
	return this.json;
};


