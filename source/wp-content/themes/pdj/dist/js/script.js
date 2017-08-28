/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire, audiojs*/

(function($) {
  // Pagination Ajax.
  var pagination_ajax = function () {
    var parent_views = $(this).parents('.views');
    var name = parent_views.find('input[name="name"]').val();
    var post_type = parent_views.find('input[name="post_type"]').val();
    var per_page = parent_views.find('input[name="per_page"]').val();
    var cat_id = parent_views.find('input[name="cat_id"]').val();
    var custom_fields = parent_views.find('input[name="custom_fields"]').val();
    var use_pagination = parent_views.find('input[name="use_pagination"]').val();
    var paged_index = $(this).parent('li').attr('data-value');
    //alert(name);
    $(this).parents('ul.pager').find('> li').removeClass('current');
    $(this).parent('li').addClass('current');

    $.ajax({
      type : "post",
      dataType : "json",
      url : paginationAjax.ajaxurl,
      data : {action: "pagination", name: name, post_type: post_type, per_page: per_page, cat_id: cat_id, custom_fields: custom_fields, paged_index: paged_index, use_pagination: '' },
      beforeSend: function() {
        //parent_views.find('.load-views').empty();
        parent_views.find('.tool-pagination.ajax-pagination').before('<div class="ajax-load-icon">load items</div>');
      },
      success: function(response) {
        parent_views.find('.ajax_views').fadeOut("normal", function() {
          $(this).remove();
        });
        parent_views.find('.load-views').fadeOut("normal", function() {
          $(this).remove();
        });
        parent_views.find('.ajax-load-icon').fadeOut("normal", function() {
          $(this).remove();
        });
        parent_views.find('.tool-pagination.ajax-pagination').before('<div class="load-views"></div>');
        parent_views.find('.load-views').fadeIn("normal", function() {
          $(this).html(response.markup);
        });
        $("select").chosen();
        popupDownload();
      },
      error: function(response) {

      }
    });

    return false;

  };

  function jcarousel_slider($name, $item) {
    if ($item < 3) {
      $($name).slick({
        infinite: true,
        slidesToShow: $item,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 568,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    } else {
      $($name).slick({
        infinite: true,
        slidesToShow: $item,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 892,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 568,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }
  }

  function slider_image_control($wrapper) {
    $($wrapper).find('> .base-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.hero-banner-control',
      autoplay: true,
      autoplaySpeed: 2000,
    });
    $($wrapper).find('> .control-slider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.hero-banner-slider',
      dots: false,
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 892,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 568,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  function navigation_fixed() {
    var banner_height = $('.hero-banner-media').outerHeight(true);
    var header_height = $('#header').outerHeight(true);
    var scroll_match = banner_height - header_height;
    var scroll_top = $(window).scrollTop();

    if (scroll_top > scroll_match) {
      $('#header').addClass('header-fixed');
    } else {
      $('#header').removeClass('header-fixed');
    }
  }

  function daterange_picker() {
    $('.daterange_picker').each(function(){
      $(this).dateRangePicker({
        autoClose: true,
        separator : ' ',
        getValue: function() {
          if ($(this).find('.date-start').val() && $(this).find('.date-end').val() )
            return $(this).find('.date-start').val() + ' ' + $(this).find('.date-end').val();
          else
            return '';
        },
        setValue: function(s,s1,s2) {
          $(this).find('.date-start').val(s1);
          $(this).find('.date-end').val(s2);
        }
      });
    });
  }

  function js_select2() {
    $('.js-select2').select2({ width: '100%' });
  }

  function block_subscribe() {
    var height_herobanner = $('.hero-banner-image').outerHeight(true);
    var window_width = $(window).width();
    var window_scroll = $(window).scrollTop();

    //console.log(window_width);

    if ((window_width < 751) || (window_scroll > height_herobanner)) {
      $('.block-subscribe').addClass('block-subscribe-fixed');
    } else if ((window_width >= 751) || (window_scroll <= height_herobanner)) {
      $('.block-subscribe').removeClass('block-subscribe-fixed');
    }
  }

  function footer_social() {
    var height_herobanner = $('.hero-banner-image').outerHeight(true);
    var window_scroll = $(window).scrollTop();

    if (window_scroll > height_herobanner) {
      $('.footer-social').show('slow');
    } else {
      $('.footer-social').hide('slow');
    }
  }

  function equerheight($parent, $compare = 'max') {
    var parent_class = $($parent);
    var window_current_width = $(window).width();

    parent_class.each(function() {
      if (window_current_width > 991) {
        var array_height = [];
        var eq_height = '';

        var main_height = $(this).find('.eq-main-height').outerHeight(true);

        $(this).find('.col-eq-height').each(function() {
          array_height.push($(this).outerHeight(true));
        });

        if (main_height !== null) {
          $(this).find('.col-eq-height').css('min-height', main_height);
        } else if ($compare == 'min') {
          var eq_height = Math.min.apply(Math,array_height);
          $(this).find('.col-eq-height').css('max-height', eq_height);
        } else if ($compare == 'max') {
          var eq_height = Math.max.apply(Math,array_height);
          $(this).find('.col-eq-height').css('min-height', eq_height);
        }
      }
    });

    $(window).resize(function() {
      var window_width = $(window).width();

      parent_class.each(function() {
        if (window_width > 991) {
          $(this).find('.col-eq-height').css({'min-height': 'unset', 'max-height': 'unset'});
          var array_height = [];
          var eq_height = '';

          var main_height = $(this).find('.eq-main-height').outerHeight(true);

          $(this).find('.col-eq-height').each(function() {
            array_height.push($(this).outerHeight(true));
          });

          if (main_height !== null) {
            $(this).find('.col-eq-height').css('min-height', main_height);
          } else if ($compare == 'min') {
            var eq_height = Math.min.apply(Math,array_height);
            $(this).find('.col-eq-height').css('max-height', eq_height);
          } else if ($compare == 'max') {
            var eq_height = Math.max.apply(Math,array_height);
            $(this).find('.col-eq-height').css('min-height', eq_height);
          }
        } else {
          $(this).find('.col-eq-height').css({'min-height': 'unset', 'max-height': 'unset'});
        }
      });
    });
  }

  /* Functions Call */
  $(document).ready(function() {
    $('.ajax-pagination .pager-item a').on('click', pagination_ajax);
    $('.date-time-picker').datepicker();
    $('.js-quicktab').tabs();
    navigation_fixed();
    daterange_picker();
    js_select2();
    //block_subscribe();
  });

  $(window).load(function() {
    // Call to 
    equerheight('.block-why-trust-me', 'min');

  });

  $(window).scroll(function() {
    // Call to function
    navigation_fixed();
    //block_subscribe();
  });

  $(window).resize(function() {
    // Call to function
    navigation_fixed();
    //block_subscribe();
  });

})(jQuery);
