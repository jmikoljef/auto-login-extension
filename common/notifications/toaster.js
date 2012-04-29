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
	//window.setTimeout(function () {_hideToast(toast, options);}, options.displayTime);
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
