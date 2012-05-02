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
