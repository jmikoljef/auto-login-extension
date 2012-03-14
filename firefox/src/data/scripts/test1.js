function maFonctionDeTest1() {
	window.alert('maFonctionDeTest1');
}

function execute(credential) {
	maFonctionDeTest0();
}

self.port.on('execute', execute);
