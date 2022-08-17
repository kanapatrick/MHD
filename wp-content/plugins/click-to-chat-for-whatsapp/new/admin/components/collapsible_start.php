<?php
/**
 * collapsible - start code
 * 
 */

if ( ! defined( 'ABSPATH' ) ) exit;

$title = (isset($input['title'])) ? esc_attr($input['title']) : '';

$description = (isset($input['description'])) ? $input['description'] : '';
?>

<ul class="collapsible">
<li class="active">
<div class="collapsible-header" id="showhide_settings"><?= $title ?></div>
<div class="collapsible-body">

<?php
if ('' !== $description) {
    ?>
    <p class="description"><?= $description; ?></p>
    <br>
    <?php
}