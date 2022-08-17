/*!
 impleCode Product AJAX Scripts
 Manages product ajax related scripts
 (c) 2021 impleCode - https://implecode.com
 */
var ic_popstate = false;
jQuery(document).ready(function () {
    /* globals product_object, ic_ajax */
    if ( /*jQuery( ".product-entry" ).length || */jQuery(".product-list").length !== 1) {
        return true;
    }
    var ic_submit_elements = jQuery.ic.applyFilters('ic_ajax_submit_elements', 'form.ic_ajax, form.product_order, .product-sort-bar form#product_search_form, form.price-filter-form');
    jQuery('body').on('change', '.product-search-box', function () {
        var search_key = jQuery(this).val();
        jQuery('.ic-search-keyword').text(search_key);
        jQuery('.product-search-box').val(search_key);

    });
    jQuery('body').on('submit', ic_submit_elements, function (e) {
        if (!ic_ajax_product_list_on_screen()) {
            return true;
        }
        e.preventDefault();
        var form = jQuery(this);
        var form_clear = '';
        form_clear = jQuery('[name!=page]', this);
        var form_data = form.serialize();
        var url_replace = '';
        if (form.data('ic_ajax') === 'page') {
            url_replace = url_replace + 'page/' + form.find('[name=page]').val();
        }
        var serialized_form = form_clear.serialize();
        if (serialized_form) {
            url_replace = url_replace + '?' + serialized_form;
        }
        var form_action = form.attr('action');
        if (url_replace !== '') {
            if (form_action.slice(-1) !== '/' && form.data('ic_ajax') === 'page') {
                form_action = form_action + '/';
            }
            url_replace = form_action + url_replace;
        } else {
            url_replace = form_action;
        }
        var change_only = '';
        if (form.hasClass('product_order')) {
            change_only = 'product_order';
        }
        ic_ajax_update_product_listing(form_data, url_replace, change_only);
    });
    var ic_click_elements = 'a.filter-url, .product-archive-nav li:not(.active) a, a.price-filter-link';
    jQuery('body').on('click', ic_click_elements, function (e) {
        if (!ic_ajax_product_list_on_screen()) {
            return true;
        }
        e.preventDefault();
        var filter_url = jQuery(this).attr('href');
        var form_data = '';
        if (filter_url.indexOf("?") !== -1) {
            form_data = filter_url.substr(filter_url.indexOf("?") + 1);
        }
        var replace_url = false;
        var page = '';
        if (jQuery(this).closest("li").data('page') !== undefined) {
            page = jQuery(this).closest("li").data('page');
        } else if (jQuery(this).data('page') !== undefined) {
            page = jQuery(this).data('page');
        }
        if (page !== '') {
            if (form_data !== '') {
                form_data = form_data + "&page=" + page;
            } else {
                form_data = form_data + "page=" + page;
            }
            replace_url = jQuery(this).attr('href');
        }
        ic_ajax_update_product_listing(form_data, replace_url);
    });
    if (jQuery(ic_submit_elements).length || jQuery(ic_click_elements).length) {
        ic_ajax_back_button_filters();
    }
});

function ic_ajax_update_product_listing(form_data, url_replace, change_only) {
    /* global ic_defaultFor */
    change_only = typeof change_only !== 'undefined' ? change_only : '';
    url_replace = ic_defaultFor(url_replace, false);
    if (url_replace === false) {
        url_replace = '?' + form_data;
    }
    if (url_replace !== 'none') {
        window.history.pushState({form_data: form_data}, document.title, url_replace);
        ic_popstate = true;
    }

    var query_vars = ic_ajax.query_vars;
    var shortcode = 0;
    if (jQuery('.product-list').data('ic_ajax_query')) {
        query_vars = JSON.stringify(jQuery('.product-list').data('ic_ajax_query'));
        shortcode = 1;
    }

    var data = {
        'action': 'ic_self_submit',
        'self_submit_data': form_data,
        'query_vars': query_vars,
        //'request_url': '/' + ( location.pathname + location.search ).substr( 1 ),
        'request_url': ic_ajax.request_url,
        'ajax_elements': {},
        'ic_shortcode': shortcode,
        'is_search': ic_ajax.is_search,
        'security': ic_ajax.nonce
    };
    jQuery.ic.doAction('ic_self_submit_before');
    if (jQuery('.product-sort-bar').length && change_only === '') {
        data['ajax_elements']['product-sort-bar'] = 1;
    }
    if (jQuery('.ic_ajax').length) {
        jQuery('.ic_ajax').each(function () {
            if (jQuery(this).data('ic_ajax').length) {
                var element_name = jQuery(this).data('ic_ajax');
                if (change_only === '' || change_only === element_name) {
                    var element_data = jQuery(this).data('ic_ajax_data');
                    if (!element_data) {
                        element_data = 1;
                    }
                    if (data['ajax_elements'][element_name] === undefined) {
                        if (data['ajax_elements']['product-sort-bar'] === undefined) {
                            data['ajax_elements'][element_name] = element_data;
                        } else if (!jQuery(this).closest('.product-sort-bar').length) {
                            data['ajax_elements'][element_name] = element_data;
                        }
                    }
                }
            }
        });
    }
    jQuery('.product-list').css('opacity', '0.5');
    jQuery.post(product_object.ajaxurl, data)
        .done(function (response) {
            /* globals modern_grid_font_size, is_element_visible */
            jQuery('.reset-filters').remove();
            try {
                response = jQuery.parseJSON(response);
            } catch (e) {
                location.reload();
                return false;
            }
            if (!response) {
                location.reload();
                return false;
            }
            if (response['redirect']) {
                var domain = (new URL(response['redirect']));
                if (domain.host === window.location.host) {
                    window.location.replace(response['redirect']);
                } else {
                    location.reload();
                }
                return false;
            }
            var listing = jQuery(response['product-listing']).not('form, div.product-sort-bar, .reset-filters');

            //jQuery( ".product-list" ).replaceWith( listing );
            jQuery('.product-list').animate({opacity: 0}, 'fast', function () {
                listing = listing.hide();
                jQuery('.product-list').replaceWith(listing);
                jQuery('.product-list').fadeIn('fast');
                setTimeout(modern_grid_font_size(), 0);
                if (!is_element_visible(jQuery(".product-list div:first-child"))) {
                    if (jQuery('.product-list div').length) {
                        jQuery('html, body').animate({
                            scrollTop: jQuery(".product-list div").offset().top - 100
                        }, 'slow');
                    }
                }
            });
            if (jQuery('.product-archive-nav').length) {
                jQuery('.product-archive-nav').replaceWith(response['product-pagination']);
            } else if (jQuery('div#product_sidebar').length) {
                jQuery(response['product-pagination']).insertAfter('div#product_sidebar');
            } else if (jQuery('article#product_listing').length) {
                jQuery(response['product-pagination']).insertAfter('article#product_listing');
            } else {
                jQuery('.product-list').after(response['product-pagination']);
            }
            jQuery.each(data['ajax_elements'], function (element_name, element_enabled) {
                if (jQuery('.' + element_name).length && (response[element_name] !== undefined)) {
                    var element_content = jQuery(response[element_name]);
                    var hide_filter = false;
                    if (element_content.hasClass('ic-empty-filter')) {
                        hide_filter = true;
                    }
                    if (!element_content.hasClass(element_name)) {
                        element_content = element_content.find('.' + element_name);
                    }

                    if (element_content.length) {
                        jQuery('.' + element_name).replaceWith(element_content);
                    } else {
                        jQuery('.' + element_name).html('');
                        hide_filter = true;
                    }
                    if (hide_filter) {
                        jQuery('.' + element_name).closest('.widget').addClass('ic-empty-filter');
                    } else {
                        jQuery('.' + element_name).closest('.widget').removeClass('ic-empty-filter');
                    }
                    jQuery('.' + element_name).trigger('reload');
                }
            });
            if (response['remove_pagination']) {
                var main_url = ic_ajax.request_url;
                if (main_url.indexOf('?') !== -1) {
                    main_url = main_url.substr(0, main_url.indexOf('?'));
                }
                var query = '';
                if (url_replace.indexOf('?') !== -1) {
                    query = url_replace.substr(url_replace.indexOf("?") + 1);
                }
                if (query !== '') {
                    query = '?' + query;
                }
                var replace_url = main_url + query;
                window.history.replaceState({}, document.title, replace_url);
            }
            jQuery.ic.doAction('ic_self_submit');
        })
        .fail(function (xhr, status, error) {
            location.reload();
        });
}

function ic_ajax_back_button_filters() {
    jQuery(window).unbind('popstate', ic_ajax_run_filters);
    jQuery(window).on('popstate', ic_ajax_run_filters);
}

function ic_ajax_run_filters(e) {
    var state = e.originalEvent.state;
    if (state !== null) {
        if (state.form_data !== undefined) {
            var form_data = state.form_data;
            if (form_data.length) {
                ic_ajax_update_product_listing(form_data, 'none');
            } else {
                window.location.reload();
            }
        }
    } else if (ic_popstate) {
        location.reload();
    }
}

function ic_ajax_product_list_on_screen() {
    if (jQuery(window).scrollTop() + jQuery(window).height() > jQuery('.product-list').offset().top) {
        return true;
    }
    return false;
}