/*
 * Auto Login Extension or ALEx, allows you to easily log in on websites
 * with tiresome security systems, such as banks.  
 * Copyright (C) 2012 Bruno Macherel, Pierre-Marie Dhaussy, Aurélie Gandour
 * <auto-login-extension@googlegroups.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  See LICENSE.txt or <http://www.gnu.org/licenses/  >.
 */

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

