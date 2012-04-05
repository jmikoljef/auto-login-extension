const CHIFFRES_BOUTON = document.getElementsByClassName('ident_chiffre_img');
const PASSWORD_INPUT = document.getElementsByName("pwd_abo")[0];
const SUBMIT_BUTTON = document.getElementById("ident_btn_submit");

var pos = new Array();

/**
 * Detect which number correspond to  each image
 */
function ocr() {
    var couples = new Array();
    for(var i in imgs) {
        var img = imgs[i];
        var canvas = getCanvas(img);
        for (var p in POINTS) {
            var point = POINTS[p];
            if(check(canvas, point)) {
                pos[p] = i;
                break;
            }
        }
    }
}

/**
 * Return a canvas object correponding to an img HTML element
 */
function getCanvas(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    
    return canvas
}

/**
 * Try to authenticate the user
 */
function authenticate(credential) {
  var haveError = false;
  // Parcourt du login pour cliquer sur les chiffres correspondant
  for(var i in credential.username) {
    var n = parseInt(credential.username[i]);
    if(n == NaN) {
      console.error("Le login doit contenir uniquement des chiffres");
      haveError = true;
    } else {
      // Recherche de la position du bouton correspondant au chiffre 'n'
      var p = pos[n];
      if(p == undefined) {
        console.error("L'image correspondant au chiffre " + n + " n'a pas été reconnu.");
        haveError = true;
      } else {
        // On a trouvé le bouton correspondant au chiffre, on peut cliquer dessus.
        if(!haveError) CHIFFRES_BOUTON[p].onclick();
      }
    }
  }
  if(haveError) {
    var element = document.getElementsByClassName('ident_chiffre2')[0];
    element.innerHTML = '<h1>' + credential.username + '</h1>' + element.innerHTML;
    return;
  }
  // On renseigne le mot de passe
  PASSWORD_INPUT.value = credential.password;
  // On soumet le formulaire
  SUBMIT_BUTTON.click();
}

/**
 * The main method of this script
 */
function execute(credential) {
  if(!credential) {
  	console.info("Merci de configurer le script avant de l'exécuter.");
  	return;
  }
  ocr();
  authenticate(credential);
}