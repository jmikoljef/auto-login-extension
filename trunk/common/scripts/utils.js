/**
 * Renvoie les données de l'image passé en paramètre encodées en base64
 */
function img2base64(img) {
	var canvas = getCanvas(img);
	var image = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
	var data = image.data;
	var dataStr = "";
	for(var i=0; i<data.length; i++) {
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

