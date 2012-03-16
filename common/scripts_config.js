const SCRIPTS_CONFIG = {
    /*
     * Free Mobile
     */
    freemobile: {
    	label: 'Free mobile',
        siteUrl: 'https://mobile.free.fr',
        loginPageUrl: 'https://mobile.free.fr/moncompte/*',
        files: ['sha1.js']
    },

    /*
     * Caisse d'epargne
     */
    caisseepargne: {
    	label: 'La Caisse d\'Epargne',
        siteUrl: 'https://www.caisse-epargne.fr',
        loginPageUrl: 'https://www.caisse-epargne.fr/ind_pauthpopup.aspx?srcurl=accueil'
    },

    /*
     * La banque postale
     */
    banquepostale: {
    	label: 'La Banque Postale',
        siteUrl: 'https://www.labanquepostale.fr',
        loginPageUrl: 'https://voscomptesenligne.labanquepostale.fr/wsost/OstBrokerWeb/loginform?TAM_OP=login'+
        '&ERROR_CODE=0x00000000&URL=%2Fvoscomptes%2FcanalXHTML%2Fidentif.ea%3Forigin%3Dparticuliers'
    }
};
