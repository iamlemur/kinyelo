$(document).ready(function() {
    $("#openNav, #fixed-nav #logo").click(function(e) {
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
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat',
        radioClass: 'iradio_flat'
    });
    $("ul.expandable > li > h2 > button").click(function(e) {
        $(this).parent().parent().toggleClass('open');
    });
    $("ol.with-details > li > div.item > button").click(function(e) {
       $(this).parent().parent().toggleClass("open");
    });
});