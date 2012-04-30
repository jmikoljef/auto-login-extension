function Template(file) {
	var opened = file.open();
	if(opened) {
		this.template = file.getContent();
		file.close();
	}
}
Template.prototype.apply = function(variables) {
	var content = this.template;
	for(var key in variables) {
		var regexp = new RegExp("\\$\\{"+key+"\\}", "g");
		content = content.replace(regexp, variables[key]);
	}
	return content;
}
