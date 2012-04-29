function Logger(level) {
	this.checkLevel = function(level) {
		return !!(this.level & level);
	}
	this.level = level;
}

Logger.prototype.LOG = 1;
Logger.prototype.DEBUG = 2;
Logger.prototype.INFO  = 4;
Logger.prototype.WARN  = 8;
Logger.prototype.ERROR = 16;

Logger.prototype.isLogEnabled = function() {
	return this.checkLevel(this.LOG);
};
Logger.prototype.isDebugEnabled = function() {
	return this.checkLevel(this.DEBUG);
};
Logger.prototype.isInfoEnabled = function() {
	return this.checkLevel(this.INFO);
};
Logger.prototype.isWarnEnabled = function() {
	return this.checkLevel(this.WARN);
};
Logger.prototype.isErrorEnabled = function() {
	return this.checkLevel(this.ERROR);
};

Logger.prototype.log = function() {
	if(this.isLogEnabled()) {
		console.log.apply(console, arguments);
	}
};
Logger.prototype.debug() {
	if(this.isDebugEnabled()) {
		console.debug.apply(console, arguments);
	}
};
Logger.prototype.info(msg) {
	if(this.isInfoEnabled()) {
		console.info.apply(console, arguments);
	}
};
Logger.prototype.warn(msg) {
	if(this.isWarnEnabled()) {
		console.warn.apply(console, arguments);
	}
};
Logger.prototype.error(msg) {
	if(this.isWarnEnabled()) {
		console.warn.apply(console, arguments);
	}
};

