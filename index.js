//$(function(){
//    wrap($('select'));
//});
//
//
//
//wrap = function(elem){
//    var options = [],
//        values = [],
//        parent = elem.parent(),
//        width = elem.width(),
//        lineHeight = elem.css('line-height');
//    elem.children('option').each(function(){
//        options.push($(this).text());
//        values.push($(this).attr('value'));
//    });
////    console.log(values);
////    console.log(options);
////    console.log(parent);
//    elem.remove();
//    parent.append('<div class="sel-wrapper" />');
//    $('.sel-wrapper').css({
//        "width": width,
//        "position": "relative",
//        "background-color": "black"
//    }).append('<div class="val-string" />');
//    $('val-string').css({
//        "position": "absolute",
//        "top": "0",
//        "display": "inline-block",
//        "line-height": lineHeight
//    });
//
//
//}