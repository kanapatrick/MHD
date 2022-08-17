<?php
/**
 * The template for displaying the footer
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Best_Shop
 */


?>
	<footer id="colophon" class="site-footer" itemscope itemtype="https://schema.org/WPFooter">
        <div class="footer-overlay">
        <?php 
        
        $footer_sidebars = array( 'advanced-footer-widget-1', 'advanced-footer-widget-2', 'advanced-footer-widget-3', 'advanced-footer-widget-4' );
        $active_sidebars = array();
        $sidebar_count   = 0;
        
        foreach ( $footer_sidebars as $sidebar ) {
            if( is_active_sidebar( $sidebar ) ){
                array_push( $active_sidebars, $sidebar );
                $sidebar_count++ ;
            }
        }
        
        $retail_storefront_newsletter =  best_shop_get_setting('subscription_shortcode');
        
        if( $active_sidebars && $sidebar_count > 0 ||  $retail_storefront_newsletter !=='' ){ ?>
            <div class="footer-top">
                <div class="container"><?php

                    if($retail_storefront_newsletter) {
                        ?>
                        <div class="footer-newsletter-section">
                        <?php
                        the_widget('best_shop_newsletter_widget', array('newsletter_shortcode'=> $retail_storefront_newsletter ));
                        ?>
                        </div>
                        <?php

                    } 
            
                    ?>
                    <div class="grid column-<?php echo esc_attr( $sidebar_count ); ?>">
                    <?php foreach( $active_sidebars as $active ){ ?>
                        <div class="col">
                           <?php dynamic_sidebar( $active ); ?> 
                        </div>
                    <?php } ?>
                    </div>
                </div>
            </div>
        <?php 
        }      
        
        
        ?>
        <div class="footer-bottom">
            
            <?php
                if( has_nav_menu( 'footer-menu' ) ): ?>            
            <div class="container">

                    <div class="footer-bottom-menu">
                            <?php
                                wp_nav_menu( array(
                                    'theme_location' => 'footer-menu',
                                    'menu_class'     => 'footer-bottom-links',
                                    'fallback_cb'    => false,
                                    'depth'          => 1,
                                ) );
                            ?>
                    </div> 

            </div>
                 <?php 
                endif;
            ?>           
            
            <div class="container footer-info">
                <?php 
                    best_shop_footer_site_info();
                   
                   best_shop_social_links(true);
                ?> 
            </div>
        </div>
      
        </div>    
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
