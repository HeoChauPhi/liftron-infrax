<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'demowp_liftron-infrax');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '1');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ',Zv*0BmNgw5%/nM&W9R!r[Iolh)<g_~1b*X#%7zPW^bslZZlVIW.FSXUZDLNm$qs');
define('SECURE_AUTH_KEY',  'Xk2kym$#=%UK*!)Vg$]W0F,g2,W%2^Z;(1Poa$aC#<_cdj}oY(P@`/Hq] /aefwH');
define('LOGGED_IN_KEY',    'baXu~rIche5?j-S0:YQqTkS 6?B^FfY[-EF}MMIA&O)=5!qR8tw+)qIHg_esl;9M');
define('NONCE_KEY',        'UhRDqW)DSXFc/LfE%vCR& 08M*@xBQNgIlDJUq~X)!9lX&%&N4TJuP>D#g&]SJBf');
define('AUTH_SALT',        'N!f:;Z)Tck/VoDt=0)@7?Ndyu=rXSkw>mp<t:f2~]z3S1wXZ!M9C$pI0-sFPCBb5');
define('SECURE_AUTH_SALT', 'xG=CH 3b.n=o>&7N}%m<v:A`Bq4kvM+br7nT*1{2cE;)-Gh;MnZDn![ct#A#Gwyd');
define('LOGGED_IN_SALT',   'W4g<e 0m#bLU>q)-JsA)Dd[:>K)LhlE]dFU<]o^c4hsHTi1S&ZlX%9;{q3kV|[f0');
define('NONCE_SALT',       '{xniz<.& o(Ltt<UU[dedwM*]!xn.5_}{%0U#$ush-+6<IRlN]j>lRE3 /:K*6DG');

/** A couple extra tweaks to help things run well on Pantheon. **/
if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == "localhost") {
  define('WP_HOME', "http://localhost/demowp/liftron-infrax/source/");
  define('WP_SITEURL', "http://localhost/demowp/liftron-infrax/source/");
} elseif (isset($_SERVER['HTTP_HOST'])) {
  // HTTP is still the default scheme for now.
  $scheme = 'http';
  // If we have detected that the end use is HTTPS, make sure we pass that
  // through here, so <img> tags and the like don't generate mixed-mode
  // content warnings.
  if (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] == 'ON') {
      $scheme = 'https';
  }
  define('WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST']);
  define('WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST']);
}

/**#@-*/

// Load packages from Composer
if ( file_exists( __DIR__ . '/wp-content/plugins/timber-library/vendor/autoload.php')) {
  require_once( __DIR__  . '/wp-content/plugins/timber-library/vendor/autoload.php');
}

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
if ( ! defined( 'WP_DEBUG' ) ) {
  define('WP_DEBUG', false);
}
//define('FS_METHOD', 'direct');

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
