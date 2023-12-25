$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="../images/chevron left solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../images/chevron right solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]

        
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list' ).eq(i).toggleClass('catalog-item__list_active');
        })
      });

      $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list' ).eq(i).toggleClass('catalog-item__list_active');
        })
      });

      //modal

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      function validateForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
        
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Пожайлуста введите имя",
              minlength: jQuery.validator.format("Ввеите {0} символа!")
            },
        
            phone: "Пожайлуста номер телефона",
            email: {
              required: "Введите свою почту",
              email: "Почта должна бьіть в формате name@domain.com"
            }
          }
        
        });
      };

      validateForms('#consultation-form');
      validateForms('#consultation');
      validateForms('#order');

      $('input[name=phone]').mask("(999) 999-9999");

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
        });
        return false;
      });

      // smooth scroll adn pageup

      $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      });
      
      $("a[href*='#']").on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $(anchor.attr('href')).offset().top
        }, 777);
        e.preventDefault();
        return false;
      });
  });

