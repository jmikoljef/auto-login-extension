self.port.on('fillForm', function(credential) {
	Logger.debug('boostrap.js', 'fillForm');
	try {
		if (fillForm(credential)) {
			self.port.emit('filled');
		}
	} catch (e) {
		Logger.error(e);
		self.port.emit('problem', e);
	}
});

self.port.on('validate', function() {
	Logger.debug('boostrap.js', 'validate');
	try {
		if (validate()) {
			self.port.emit('validated');
		}
	} catch (e) {
		Logger.error(e);
		self.port.emit('problem', e);
	}
});
