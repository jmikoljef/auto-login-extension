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

/**
 * Renvoie les données de l'image passé en paramètre encodées en base64
 */
function img2base64(img) {
	var canvas = getCanvas(img);
	var image = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
	var data = image.data;
	var dataStr = "";
	for ( var i = 0; i < data.length; i++) {
		dataStr += String.fromCharCode(data[i]);
	}
	var base64 = Base64.encode(dataStr);

	return base64;
}

/**
 * Renvoie un object Canvas a partir de l'image passé en paramètre
 */
function getCanvas(img) {
	// Create an empty canvas element
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;

	// Copy the image contents to the canvas
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);

	return canvas;
}

/*
 * Classe de logging
 */
function Logger() {
};

// Change to false to turn off debugging
Logger.debugEnabled = true;

Logger.debug = function() {
	if (Logger.debugEnabled) {
		try {
			console.debug.apply(console, arguments);
		} catch (e) {
			var message = '';
			for ( var a in arguments) {
				if (!!message)
					message += ', ';
				message += arguments[a];
			}
			console.debug(message);
		}
	}
}

Logger.log = function() {
	try {
		console.log.apply(console, arguments);
	} catch (e) {
		var message = '';
		for ( var a in arguments) {
			if (!!message)
				message += ', ';
			message += arguments[a];
		}
		console.log(message);
	}
}

Logger.error = function() {
	try {
		console.error.apply(console, arguments);
	} catch (e) {
		var message = '';
		for ( var a in arguments) {
			if (!!message)
				message += ', ';
			message += arguments[a];
		}
		console.error(message);
	}
}

Logger.dir = function() {
	try {
		console.dir.apply(console, arguments);
	} catch (e) {
		Logger.log.apply(LOGGER, arguments);
	}
}

/*
 * </logging>
 */
