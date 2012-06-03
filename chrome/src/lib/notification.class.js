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

var Notification = (function() {

	function Class(i18n) {
		this.i18n = i18n;
	}

	Class.prototype.notify = function(state, config) {
		var instance = this;
		chrome.tabs.get(config.tabId, function(tab) {
			notify(
				config.tabId,
				{
					content: getMessageFromState(state, instance.i18n),
					image: tab.favIconUrl,
					title: config.label
				}
			);
		});
	}

	function notify(tabId, notification) {
		notification.timeout = 5000;
		var mode = OptionManager.getOption("main").notification;
		switch(mode) {
			case 'page':
				notifyPage(tabId, notification);
				break;
			case 'browser':
				notifyBrowser(notification);
				break;
			case 'desktop':
				notifyDesktop(notification);
				break;
			case 'none':
			default:
				// No notification
		}
	}

	var template = new Template(new File("notifications/alex.html", chrome.extension.getURL));

	function notifyDesktop(notification) {
		var notif = webkitNotifications.createNotification(
			notification.image,
			notification.title, 
			notification.content
		);
		notif.ondisplay = function() {
			if(notification.timeout>=0) {
				setTimeout(function() { notif.cancel(); }, notification.timeout);
			}
		};
		notif.show();
	}

	function notifyBrowser(notification) {
		var content = template.apply(notification).replace(/\n/g, "").replace(/\'/g, "\\'");
		chrome.windows.getAll({populate: true}, function(windows) {
			for(var i=0; i<windows.length; i++) {
				var win = windows[i];
				for(var j=0; j<win.tabs.length; j++) {
					toastIt(win.tabs[j].id, content, notification.timeout);
				}
			}
		});
	}

	function notifyPage(tabId, notification) {
		var content = template.apply(notification).replace(/\n/g, "").replace(/\'/g, "\\'");
		toastIt(tabId, content, notification.timeout);
	}
	
	function toastIt(tabId, content, timeout) {
		chrome.tabs.insertCSS(tabId, {file: "notifications/alex.css"});
		chrome.tabs.executeScript(tabId, {file: "notifications/toaster.js"}, function() {
			chrome.tabs.executeScript(tabId, { code: 
				"toastIt({"+
					"content: '"+content+"', "+
					"displayTime: "+timeout+
				"});"
			});
		});
	}

	function getMessageFromState(state, i18n) {
		switch (state) {
			case "filled":
				return i18n.getMessage('form_filled');
			case "validated":
				return i18n.getMessage('authentication_in_progress');
			case "error":
			default:
				return i18n.getMessage('authentication_error');
		}
	}

	return Class;
})();
