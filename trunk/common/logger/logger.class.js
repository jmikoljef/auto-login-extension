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

var Logger = (function() {
	/**
	 * Constructor
	 * All method are static, so it's usefull only for class declaration
	 */
	function Class() {
	}

	Class.ALL   = 0;
	Class.LOG   = 1<<0;//1
	Class.DEBUG = 1<<1;//2
	Class.INFO  = 1<<2;//4
	Class.WARN  = 1<<3;//8
	Class.ERROR = 1<<4;//16
	Class.NONE  = (1<<8)-1;//255

	Class.level = Class.INFO;

	Class.checkLevel = function(level) {
		return level>=Class.level; // or !!(Class.level & level);
	}

	Class.formatLogMessage = function(args) {
		var result = [Class.formatLogMessage.caller.name];
		for(var i in args) {
			result.push(args[i]);
		}
		return result;
	}

	Class.writeLog = function(logFunction, args) {
		var params = Logger.formatLogMessage(args);
		logFunction.apply(console, params);
	}

	Class.isLogEnabled = function() {
		return Class.checkLevel(Class.LOG);
	};
	Class.isDebugEnabled = function() {
		return Class.checkLevel(Class.DEBUG);
	};
	Class.isInfoEnabled = function() {
		return Class.checkLevel(Class.INFO);
	};
	Class.isWarnEnabled = function() {
		return Class.checkLevel(Class.WARN);
	};
	Class.isErrorEnabled = function() {
		return Class.checkLevel(Class.ERROR);
	};

	Class.log = function() {
		if(Class.isLogEnabled()) {
			Class.writeLog(console.log, arguments);
		}
	};
	Class.debug = function() {
		if(Class.isDebugEnabled()) {
			Class.writeLog(console.debug, arguments);
		}
	};
	Class.info = function(msg) {
		if(Class.isInfoEnabled()) {
			Class.writeLog(console.info, arguments);
		}
	};
	Class.warn = function(msg) {
		if(Class.isWarnEnabled()) {
			Class.writeLog(console.warn, arguments);
		}
	};
	Class.error = function(msg) {
		if(Class.isWarnEnabled()) {
			Class.writeLog(console.warn, arguments);
		}
	};

	return Class;
})();

