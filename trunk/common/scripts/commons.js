// Create a new object, that prototypally inherits from the Error constructor.  
function IncorrectLoginError() {  
    this.i18n_message = "incorrect_login";
}  
IncorrectLoginError.prototype = new Error();  
IncorrectLoginError.prototype.constructor = IncorrectLoginError;  
function ImageRecognitionError() {  
    this.i18n_message = "image_recognition_error";
}  
ImageRecognitionError.prototype = new Error();  
ImageRecognitionError.prototype.constructor = ImageRecognitionError;  

