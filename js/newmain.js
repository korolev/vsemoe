/**
 * Created by mk-sfdev on 5/19/14.
 */


$(function () {
    var bg_1 = $('.background-one'),
        bg_2 = $('.background-two'),
        img_1 = $('.image-one'),
        img_2 = $('.image-two'),
        stLeft1 = parseInt(img_1.css('left'), 10),
        stLeft2 = parseInt(img_2.css('left'), 10);


    var time1 = 3000;

    var animate = function () {
        setTimeout(function () {
            bg_2.animate({opacity: 0}, time1, function () {

            });
            bg_1.animate({opacity: 1}, time1, function () {
                img_1.css({left: 3000});
                img_2.animate({left: -3000}, time1 / 4, function () {
                    img_1.removeClass('hidden');
                    img_1.animate({left: stLeft1 + 'px'}, time1 / 4, function () {
                        setTimeout(function () {
                            img_1.animate({left: -3000}, time1 / 4, function () {
                                img_1.addClass('hidden').removeAttr('style');
                                img_2.css({left: 3000});
                                img_2.animate({left: stLeft2}, time1 / 4, function () {
                                    setTimeout(function () {
                                        bg_2.animate({opacity: 1}, time1, function () {

                                        });
                                        bg_1.animate({opacity: 0}, time1, function () {
                                            animate();
                                        });
                                    }, time1);
                                });
                            });
                        }, time1);
                    });
                });
            })
        }, time1);
    };

    animate();

});