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

NotificationModule = require('module-notifications');
PasswordManager = require("password-manager");
Storage = require("simple-storage").storage;
Logger = require('logger');

// Alex constructor
exports.Alex = function(script, worker) {
	Logger.debug('alex.class.js', 'exports.Alex', script, worker);
	return new Alex(script, worker);
}

function Alex(script, scriptWorker) {
	Logger.debug('alex.class.js', 'Alex', script, scriptWorker);
	this.script = script;
	this.worker = scriptWorker;
	this.filled = false;
	this.validated = false;
	var instance = this;
	this.worker.port.on('problem', function(data) {
		instance.onProblem(data);
	});
	this.worker.port.on('filled', function(data) {
		instance.onFilled(data);
	});
	this.worker.port.on('validated', function(data) {
		instance.onValidated(data);
	});
}

Alex.prototype.fillForm = function() {
	Logger.debug('alex.class.js', 'fillForm');
	if (!!Storage[this.script.id] && Storage[this.script.id].enabled) {
		var theWorker = this.worker;
		PasswordManager.getFirst({
			url : this.script.site
		}, function(credential) {
			theWorker.port.emit('fillForm', credential);
		});
	}
}

Alex.prototype.validate = function() {
	Logger.debug('alex.class.js', 'validate');
	this.worker.port.emit('validate');
}

Alex.prototype.onFilled = function() {
	Logger.debug('alex.class.js', 'onFilled');
	this.filled = true;

	if (!!Storage[this.script.id] && Storage[this.script.id].mode == 'auto') {
		this.validate();
	} else {
		var instance = this;
		NotificationModule.notify({
		    pageWorker : instance.worker,
		    state : 'filled',
		    script : instance.script
		});
	}
}

Alex.prototype.onValidated = function() {
	Logger.debug('alex.class.js', 'onValidated');
	this.validated = true;
	var instance = this;
	NotificationModule.notify({
	    pageWorker : instance.worker,
	    state : 'validated',
	    script : instance.script
	});
}

Alex.prototype.onProblem = function(message) {
	Logger.debug('alex.class.js', 'onProblem', message);
	var instance = this;
	NotificationModule.notify({
	    pageWorker : instance.worker,
	    state : 'error',
	    message : message,
	    script : instance.script
	});
}
