const SCRIPTS_CONFIG = [
    /*
     * Free Mobile
     */
    {
    	id: 'freemobile',
    	label: 'Free mobile',
        site: 'https://mobile.free.fr',
        pages: ['https://mobile.free.fr/moncompte/', 'https://mobile.free.fr/moncompte/index.php'],
        files: ['points.js']
    },

    /*
     * Caisse d'epargne
     */
    {
    	id: 'caisseepargne',
    	label: 'La Caisse d\'Epargne',
        site: 'https://www.caisse-epargne.fr',
        pages: [/.*caisse-epargne\.fr.*ind_pauthpopup\.aspx.*/]
    },

    /*
     * La banque postale
     */
    {
    	id: 'banquepostale',
    	label: 'La Banque Postale',
        site: 'https://www.labanquepostale.fr',
        pages: ['https://voscomptesenligne.labanquepostale.fr/wsost/OstBrokerWeb/loginform?TAM_OP=login&ERROR_CODE=0x00000000&URL=%2Fvoscomptes%2FcanalXHTML%2Fidentif.ea%3Forigin%3Dparticuliers'],
        libs: ['utils.js', 'base64.js', 'sha1.js']
    },

    /*
     * Le crédit agricole
     */
    {
    	id: 'creditagricole',
    	label: 'Cr\u00E9dit Agricole',
        site: 'http://www.credit-agricole.fr/',
        pages: [/https:\/\/.*\.credit-agricole\.fr\/stb\/entreeBam/]
    	/*
    	 * Il existe 2 variantes des sites du CA, seule la plus courante est gérée.
    	 * Voici la regex qui nous permettra de gérer prochainement la 2ème : /https:\/\/.*\.credit-agricole\.fr\/g1\/ssl\/identification\/nav1\/acc_ide1_1\.htm/
    	 */
    }
];
