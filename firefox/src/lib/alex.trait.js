EventEmitterTrait = require("api-utils/events").EventEmitterTrait;
LightTrait = require('api-utils/light-traits').Trait;
MODULE_NOTIFICATIONS = require('module-notifications');
PASSWORD_MANAGER = require("password-manager");

Logger = require('logger');

AlexTrait = LightTrait.compose(EventEmitterTrait, LightTrait({
    init : function (scriptUrl, scriptWorker) {
    	Logger.debug('alex.js', 'AlexTrait.init');
    	this.url = scriptUrl;
    	this.worker = scriptWorker;
	    this.filled = false;
	    this.validated = false;
	    this.worker.port.on('error', this.onError);
	    this.worker.port.on('filled', this.onFilled);
	    this.worker.port.on('validated', this.onValidated);
    },

    onError : function (message) {
    	Logger.debug('alex.js', 'AlexTrait.onError');
	    MODULE_NOTIFICATIONS.notify({
	        pageWorker : this.worker,
	        state : 'error',
	        message : message,
	        site : this.url
	    });
    },

    onFilled : function () {
    	Logger.debug('alex.js', 'AlexTrait.onFilled');
	    this.filled = true;
	    MODULE_NOTIFICATIONS.notify({
	        pageWorker : this.worker,
	        state : 'filled',
	        site : this.url
	    });
	    // TODO check mode
	    this.validate();
    },

    onValidated : function () {
    	Logger.debug('alex.js', 'AlexTrait.onValidated');
	    this.validated = true;
	    MODULE_NOTIFICATIONS.notify({
	        pageWorker : this.worker,
	        state : 'validated',
	        site : this.url
	    });
    },

    fillForm : function () {
    	Logger.debug('alex.js', 'AlexTrait.fillForm');
    	var worker = this.worker;
	    PASSWORD_MANAGER.getFirst({
		    url : this.url
	    }, function(credential) {
	    	worker.port.emit('fillForm', credential);
	    });
    },

    validate : function () {
    	Logger.debug('alex.js', 'AlexTrait.validate');
    	this.worker.port.emit('validate');
    }
}));

function Alex(script, worker) {
	Logger.debug('alex.js', 'Alex');
	var alex = AlexTrait.create(Alex.prototype);
	alex.init(script, worker);
	return alex;
}

exports.Alex = Alex;
