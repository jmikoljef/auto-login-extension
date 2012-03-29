const SCRIPTS_CONFIG = [
    /*
     * Free Mobile
     */
    {
    	id: 'freemobile',
    	label: 'Free mobile',
        site: 'https://mobile.free.fr',
        page: ['https://mobile.free.fr/moncompte/*'],
        libs: ['sha1.js']
    },

    /*
     * Caisse d'epargne
     */
    {
    	id: 'caisseepargne',
    	label: 'La Caisse d\'Epargne',
        site: 'https://www.caisse-epargne.fr',
        page: ['https://www.caisse-epargne.fr/ind_pauthpopup.aspx*', 'https://www.caisse-epargne.fr/particuliers/ind_pauthpopup.aspx*']
    },

    /*
     * La banque postale
     */
    {
    	id: 'banquepostale',
    	label: 'La Banque Postale',
        site: 'https://www.labanquepostale.fr',
        page: ['https://voscomptesenligne.labanquepostale.fr/wsost/OstBrokerWeb/loginform?TAM_OP=login&ERROR_CODE=0x00000000&URL=%2Fvoscomptes%2FcanalXHTML%2Fidentif.ea%3Forigin%3Dparticuliers']
    }
];

try {
	// Firefox
	exports.SCRIPTS = SCRIPTS_CONFIG;
} catch(err) {
	// Une erreur ? C'est que ça doit-être Chrome !
	console.error(err);
}
