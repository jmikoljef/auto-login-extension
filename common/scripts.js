{
    /*
     * Free Mobile
     */
    freemobile: {
	    id: 'freemobile',
    	label: 'Free mobile',
        siteUrl: 'https://mobile.free.fr',
        loginPageUrl: 'https://mobile.free.fr/moncompte/*',
        scriptFile: ['lib/sha1.js', 'scripts/freemobile.js']
    },

    /*
     * Caisse d'epargne
     */
    caisseepargne: {
	    id: 'caisseepargne',
    	label: 'Caisse d\'Epargne',
        siteUrl: 'https://www.caisse-epargne.fr',
        loginPageUrl: 'https://www.caisse-epargne.fr/ind_pauthpopup.aspx?srcurl=accueil',
        scriptFile: 'scripts/caisseepargne.js'
    },

    /*
     * La banque postale
     */
    banquepostale: {
	    id: 'banquepostale',
    	label: 'La Banque Postale',
        siteUrl: 'https://www.labanquepostale.fr',
        loginPageUrl: 'https://voscomptesenligne.labanquepostale.fr/wsost/OstBrokerWeb/loginform?TAM_OP=login'+
        '&ERROR_CODE=0x00000000&URL=%2Fvoscomptes%2FcanalXHTML%2Fidentif.ea%3Forigin%3Dparticuliers',
        scriptFile: 'scripts/banquepostale.js'
    }
}
