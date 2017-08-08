<?php
/**
 * Template Name: Beaver Builder Pages
 *
 * @package WordPress
 * @subpackage PDJ
 * @since PDJ 1.0
 */

/*$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['title_option'] = framework_page('title');

Timber::render( 'beaver-builder-page.twig', $context );*/
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <?php
    if (is_front_page()) { ?>
      <title><?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description' ); ?></title>
    <?php
    } else { ?>
      <title><?php bloginfo(); ?> - <?php wp_title(); ?> </title>
    <?php
    }
    ?>
    <meta name="description" content="<?php bloginfo( 'description' ); ?>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1, minimum-scale=1">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri().'/dist/images/favicon.ico'; ?>" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
  <?php
    while ( have_posts() ) : the_post();
    if (framework_page('title') != 'on') {
      echo '<h1 id="page-title">';
      the_title();
      echo '</h1>';
    }
    the_content();
    endwhile;
  ?>

  <?php wp_footer(); ?>
  </body>
</html>