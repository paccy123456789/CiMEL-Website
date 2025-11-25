(function ($) {
    "use strict";

    // Add scroll progress indicator
    $('body').prepend('<div class="progress-container"><div class="progress-bar" id="progressBar"></div></div>');
    
    // Update progress bar on scroll
    $(window).scroll(function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progressBar").style.width = scrolled + "%";
    });
    
    // Function to handle smooth scrolling for anchor links
    function initSmoothScrolling() {
        // Add smooth scrolling to the target section for all hash links
        $('a[href^="#"]').on('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();
                const hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 70
                }, 800, 'easeInOutExpo');
            }
        });
    }
    
    // Run on document ready
    $(document).ready(function() {
        initSmoothScrolling();
    });
    
    // Also run after any AJAX content loads
    $(document).ajaxComplete(function() {
        initSmoothScrolling();
    });

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Sticky Navbar with smooth transition
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top shadow-sm').css('transition', 'all 0.3s ease');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Enhanced Dropdown with animation
    $(document).ready(function () {
        // Mobile menu toggle
        $('.navbar-toggler').on('click', function() {
            $('.navbar-collapse').slideToggle(300);
        });

        // Dropdown animations
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseenter', function () {
                    $(this).addClass('show');
                    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
                }).on('mouseleave', function () {
                    $(this).removeClass('show');
                    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
                });
            } else {
                $('.navbar .dropdown').off('mouseenter').off('mouseleave');
                $('.navbar .dropdown-toggle').on('click', function(e) {
                    e.preventDefault();
                    $(this).next('.dropdown-menu').slideToggle(200);
                });
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        // Add animation to all section headings
        $('h1, h2, h3, h4, h5, h6').each(function() {
            $(this).addClass('animate__animated animate__fadeInUp');
        });
    });
    
    // Smooth scrolling for all links
    $('a[href*="#"]:not([href="#"])').on('click', function(e) {
        if (this.hash !== "" && $(this).attr('href').indexOf('#') === 0) {
            e.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800, 'easeInOutExpo', function(){
                window.location.hash = hash;
            });
        }
    });
    
    // Back to top button functionality has been removed as per user request

    // Enhanced Testimonials carousel with autoplay and touch support
    if ($.fn.owlCarousel) {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            autoplaySpeed: 1000,
            smartSpeed: 1500,
            items: 1,
            dots: true,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ],
            responsive: {
                0: { items: 1 },
                768: { items: 1 },
                1000: { items: 1 }
            }
        });
    }

    // Add animation to elements when they come into view
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll + windowHeight > position + 100) {
                $(this).addClass('animated');
            }
        });
    }

    // Run on load and scroll
    $(window).on('load scroll', animateOnScroll);

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Form validation animation
    $('form').on('submit', function(e) {
        var form = $(this);
        if (form[0].checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            form.addClass('was-validated');
        }
    });

})(jQuery);
