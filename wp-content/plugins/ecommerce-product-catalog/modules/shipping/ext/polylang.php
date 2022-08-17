<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
/*
 *
 *  @version       1.0.0
 *  @package
 *  @author        impleCode
 *
 */

add_filter( 'pll_copy_post_metas', 'ic_polylang_translate_shipping', 10, 2 );

function ic_polylang_translate_shipping( $metas, $sync ) {
	if ( $sync === true ) {
		return $metas;
	}
	$shipping_meta_keys = array();
	$max_shipping       = get_shipping_options_number();
	for ( $i = 1; $i <= $max_shipping; $i ++ ) {
		$shipping_meta_keys[] = '_shipping' . $i;
		$shipping_meta_keys[] = '_shipping-label' . $i;
	}

	return array_merge( $metas, $shipping_meta_keys );
}
