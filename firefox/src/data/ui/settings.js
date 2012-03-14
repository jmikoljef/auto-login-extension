function _get(id) {
    return document.getElementById(id);
}

function changeCredential(url, usernameInput, passwordInput) {
    var credential = {
        url: url,
        username: usernameInput.value,
        password: passwordInput.value
    };
    if(!!credential.username) {
        self.port.emit('changeCredential', credential);
    } else {
        console.warn('username empty for: ' + url);
    }
}

_get('freemobile_button').addEventListener('click', function (){
    changeCredential('https://mobile.free.fr', _get('freemobile_username'), _get('freemobile_password'));
});

_get('caisseepargne_button').addEventListener('click', function (){
    changeCredential('https://www.caisse-epargne.fr', _get('caisseepargne_username'), _get('caisseepargne_password'));
});

_get('banquepostale_button').addEventListener('click', function (){
    changeCredential('https://www.labanquepostale.fr', _get('banquepostale_username'), _get('banquepostale_password'));
});
