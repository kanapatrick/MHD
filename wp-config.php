<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en « wp-config.php » et remplir les
 * valeurs.
 *
 * Ce fichier contient les réglages de configuration suivants :
 *
 * Réglages MySQL
 * Préfixe de table
 * Clés secrètes
 * Langue utilisée
 * ABSPATH
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'mhd_db' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'root' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', 'KaPat123' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/**
 * Type de collation de la base de données.
 * N’y touchez que si vous savez ce que vous faites.
 */
define( 'DB_COLLATE', '' );

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'H?aBf`IjOQBb =.a@oj%E-9oAr2<!I*<?g%<$w1h.KNG`1SEh;`=Rg4tix(LW ^K' );
define( 'SECURE_AUTH_KEY',  'Wie6L#Bybv85(!0T$o(q,UW78WT%0Z+R[-MZP2`+cI@M@Ihs|VqAlsqlr<[~84T?' );
define( 'LOGGED_IN_KEY',    'D`;UPGF9mKxav5(}rObsY34?u2B$^km7ng!Jg%t+8A0X[%w#emxB?1M@Ax;!jSv4' );
define( 'NONCE_KEY',        'AK%D[L,Ic5B.~;M=`-d]4j#KUo2V8vA,GTvGGBP[948C!=jzMBm!^/$}`&Ul,%fm' );
define( 'AUTH_SALT',        '/Dby`DKRQ1Gz+)uqwZ}:I]v$&lQ2Xp(QO?tM?&RKJt!O8@aG6*=?DN3AC17[X&<i' );
define( 'SECURE_AUTH_SALT', 'J^*rL1b/wX/]xD <UYvY{x^9~oY%oM!5K:_/OG>N4+j3Kb7cyg5@]U@h-I8q|8*a' );
define( 'LOGGED_IN_SALT',   '2{@>3Mw{HDOdyQEi4R:oWaPEP,KWfs6(fA7%#FT~J%+A_Dt0`z@%-##>G8^~(6]A' );
define( 'NONCE_SALT',       'dG{kWFg3MNJ+mH5[NhLs5;cETi%7-B!iH#1k+P 3B+La(my1 Bx:x](KqdfhR-T1' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortement recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( ! defined( 'ABSPATH' ) )
  define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once( ABSPATH . 'wp-settings.php' );
