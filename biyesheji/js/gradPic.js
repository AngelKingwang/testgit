$('.aside').mouseover(function(){
    $(this).stop().animate({left:0}, 1000);
});
$('.aside').mouseout(function(){
    $(this).stop().animate({left:-195}, 1000);
})

var oLength=$('.main img').length;
for(var i=0;i<oLength;i++){
    $('.main img').eq(i).css({
        transform: "rotateY("+(360/oLength*i)+"deg) translateZ(500px)"
    });
}


$('.button button').eq(0).click(function(){
    $('body').css({background:"#000"});
    $('.main').addClass('animate');
})
$('.button button').eq(1).click(function(){
    $('body').css({backgroundImage: "url(../images/gP_bg2.jpg)"});
    $('.main').removeClass('animate');
})

