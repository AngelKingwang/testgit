var oIndex=$('.mz_img li').index();
var oLength=$('.mz_img li').length;
var timer=setTimeout(autoPlay, 1000);
var flag=true;

$('.mz_banner').mouseover(function(){
    flag=false;
    clearTimeout(timer);
});
$('.mz_banner').mouseout(function(){
    flag=true;
    timer=setTimeout(autoPlay, 1000);
});
$('.mz_dian li').click(function(){
    oIndex=-$(this).index()+1;
});

$.ajax({
  type:'get',
  url:'../json/index.json',
  success:function(r){
    $('.c_liuyan h2').append(r[1].LiuYan);
    for(var j=0;j<r[1].Info.length;j++){
      $('.c_liuyan').append('<p>'+(j+1)+'.'+r[1].Info[j].Title+'</p>')
    }
  }
})

$('.c_left ul li').click(function(){
  $(this).addClass('c_orange').siblings().removeClass('c_orange');
})
$('.c_left ul li').eq(0).click(function(){
  $('.c_zhao').show().siblings().hide();
})
$('.c_left ul li').eq(1).click(function(){
  $('.c_liuyan').show().siblings().hide();
})

$.getJSON('json/index.json',function(data){
  for(var i=0;i<data[0].Info.length;i++){
    $('.mz_info ul').append('<li><a>'+data[0].Info[i].Title+'<span>'+data[0].Info[i].time+'</span></a></li>')
  }
  $('.main_liuyan h2').append(data[1].LiuYan)
  for(var j=0;j<data[1].Info.length;j++){
    $('.main_liuyan ul').append('<li><a>'+data[1].Info[j].Title+'</a></li>');
  }
  $('.main_lunwen h2').append(data[2].lunwen)
  for(var n=0;n<data[2].Info.length;n++){
    $('.main_lunwen ul').append('<li><a>'+data[2].Info[n].Title+'<span>--'+data[2].Info[n].stu+'</span></a></li>')
  }
})
$('.mz_info ul').delegate('li','click',function(){
  window.location.href='html/zhaopin.html';
})
$('.main_liuyan ul').delegate('li','click',function(){
  window.location.href='html/zhaopin.html';
})


function autoPlay(){
    oIndex--;
    var oDian=-(oIndex%6);
    if(oIndex==-oLength){
        oIndex=-1;
        $('.mz_img').css({left: 0});
    }
    $('.mz_img').animate({left: 450*oIndex+'px'},1000,function() {
        clearTimeout(timer);
        if(flag){
            timer=setTimeout(autoPlay, 1000);
        }
    });
    $('.mz_dian li').eq(oDian).addClass('mz_color').siblings('li').removeClass('mz_color');
}
