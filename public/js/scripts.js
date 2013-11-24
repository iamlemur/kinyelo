$(document).ready(function() {
    $("#openNav").click(function() {
        $("html").toggleClass('js-site-nav');
    });
    $("#openUtils").click(function() {
        $("html").toggleClass('js-utils-nav');
    });
    $(".nano").nanoScroller();
});