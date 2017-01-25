$(document).ready(function () {
    $("li").click(function () {
        $("li").removeClass("active");
        $(this).addClass("active");
    });
    $("td").click(function () {
        $("tr").removeClass("success");
        $(this).addClass("success");
    });
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });
    $('.dropdown-toggle').dropdown();
    $("#elementsTable img").hover(function () {
        $(this).find('.sub-menu').slideDown();
    });
    $("#elementsTable img").click(function () {
        $(this).find('.sub-menu').slideDown();
    });
    
     $(function () {
            $(".menu").hover(function () {
                $(".sub").slideToggle(400);
            }, function () {
                $(".sub").hide();
            });
        });
    
});