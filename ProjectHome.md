## Auto-Login Extension or  ALEx ##

Little Web browser addon helping user to log on sites with exotic protections

### TODO ###

  * Valider la proposition de versionning suivante : X.Y.Z
    * X : Version majeure impliquant une ou plusieurs fonctionnalités importantes pouvant casser la compatibilité avec les anciennes versions
    * Y : Version mineure, nouvelles fonctionnalités minimes, corrections de bugs
    * Z : Version spécifique au navigateur : corrections de bugs spécifiques au navigateur, ajout de fonctionnalités non reportées dans les versions pour les autres navigateurs.
  * Se documenter (à fond) sur l'accès au gestionnaire de mot de passe depuis les extensions Chrome {À faire}
  * Valider la roadmap

### Roadmap ###

#### v0.1.x ####

  * ~~Sortir l'IHM de config dans le dossier common/configuration et y apporter les modifications de la maquette~~
  * ~~Intégrer l'IHM à chaque navigateur~~
  * Donner un nom d'animal à la version !
  * ~~Proposer une option "mode de connexion" pour chaque site :~~
    * ~~Automatique : login dès que le site est chargé~~
    * ~~Manuel : Affichage d'une notification dès le script a réussi à remplir login/mdp~~
      * ~~Sur la page du site concerné : Une notif persistante et comporte un bouton pour se logguer~~
      * ~~Sur les autres pages : une notif simple qui disparait au bout de n secondes (ex : 5)~~
  * ~~mv scripts\_config.js scripts/manifest.js~~
  * Refaire et unifier les outils de fabrication/valorisation/release (makefile/ANT ?) (Repoussé dans une version ultérieure)
  * Créer une classe qui sera en charge de gérer les événements en provenance des scripts et l'ajouter dans les libs communes (OK dans FF)
  * ~~Proposer une IHM pour l'apprentissage des chiffres freemobile~~ (Plus nécessaire)

#### v0.0.1 ####

  * ~~Modification du nom des 2 extensions pour AutoLoginExtension~~
  * ~~Reset du versionning des 2 extensions~~
  * ~~Fusion des codes similaire/identique dans une lib commune~~
  * ~~Ajouter un système de script qui permettrait de gérer n'importe quel site~~
  * ~~Mettre en place les outils de compilation/fabrication/packaging et les automatiser~~

#### Features proposal ####

##### Prochaine version #####

  * Créer 10 nouveaux scripts
  * Trouver un système permettant de détecter les échecs de connexion
  * Gérer le multi-compte (plusieurs comptes sur 1 site)
  * Mode par défaut choisi par les scripts dans le manifest.js
  * Imposer une convention de nommage globale (ensemble du code JS, mais aussi HTML, css et nom des répertoires et fichiers) et effectuer le refactoring
  * Crée un logger commun, si possible sous la forme d'un classe Static afin de:
    * Permettre l'activiation/désactivation/changement de niveau à un seul endroit du code
    * Ne pas avoir à partager une instance du logger entre différentes parties qui ne communiquent pas facilement
  * Écrire la documentation permettant de crée des scripts

##### Versions suivantes #####

  * Mettre en place un répo de scripts dans lequel l'utilisateur coche ceux qui l'intéresse.
  * Ajouter un mécanisme alternatif au password-manager (pour compatibilité Chrome).


#### Liste de sites (géré/encours/à faire) ####

  * FreeMobile (2ème implémentation OK)
  * Caisse-Epargne (OK)
  * La Banque Postale (En cours à tester sur d'autres environnements)
  * Crédit Agricole (OK)

  * Société générale
  * BNP Paribas
  * HSBC
  * AXA
  * ING direct
  * Banque Accord
  * Allianz
  * Monabanq

==== Scripts concurrents
  * FreeMobile TinyAuth