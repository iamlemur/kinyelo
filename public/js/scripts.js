$(document).ready(function() {
    $("#openNav").click(function(e) {
        e.preventDefault();
        $("html").toggleClass('js-site-nav');
    });
    $("#active-nav-overlay").click(function() {
        $("html").removeClass('js-site-nav').removeClass('js-utils-nav');
    });
    $("#openUtils").click(function(e) {
        e.preventDefault();
        $("html").toggleClass('js-utils-nav');
    });
    //$(".nano").nanoScroller();
    $(".post-container header").waypoint('sticky', {
        context: ".outer-content-wrapper"
    });
    /*$(".post-container header").waypoint(function(direction) {
        if(direction == "down") {
            $(".post-container").addClass('sticky');
            //$(".post-container").css('padding-top', $(this).height());
        } else if (direction == "up") {
            $(".post-container").removeClass('sticky');
            //$(".post-container").css('padding-top', '0');
        }
    }, {
        context: ".outer-content-wrapper"
    });*/
 //   $.waypoints('refresh');
});