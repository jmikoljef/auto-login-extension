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

/*
 * Toaster v0.1
 * 
 */

/*
 * Time during which the notification stay visible (default : 5s)
 */
const DEFAULT_DISPLAY_TIME = 5000;

var toaster = undefined;

/*
 * Create a notification and display it
 */
function toastIt(options) {
	if(!toaster) {
		initToaster();
	}
	if(!options.displayTime) {
		options.displayTime = DEFAULT_DISPLAY_TIME;
	}
	var toast = _createToast(options);
	_showToast(toast, options);
	window.setTimeout(function () {_hideToast(toast, options);}, options.displayTime);
}

/*
 * Create notifications parent box
 */
function initToaster() {
	toaster = document.createElement('div');
	toaster.className = 'toaster';
	document.body.appendChild(toaster);
}

/*
 * Create a notification
 */
function _createToast(options) {
	var toast = document.createElement('div');
	toast.className = 'toast';
	toast.addEventListener('click', function (event) {_onToastClick(toast, options)});
	if(!!options.content) {
		toast.innerHTML = options.content;
	} else {
		toast.innerHTML = 'Notification content not defined !'
	}
	toaster.appendChild(toast);
	return toast;
}

/*
 * Intercept click on notification
 */
function _onToastClick(toast, options) {
	if(!!options.hideOnClick) {
		_hideToast(toast);
	}
}

/*
 * Display a notification
 */
function _showToast(toast) {
	window.setTimeout(function() {toast.className = 'toast toast-show';}, 100);
}

/*
 * Hide a notification
 */
function _hideToast(toast) {
	toast.className = 'toast toast-hide';
	window.setTimeout(function() {toaster.removeChild(toast);}, 1000);
}
