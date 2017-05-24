$('#back_btn').click(function(){
  var con=$('#back_con').val();
  // console.log(con);

  var d=new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  var output=d.getFullYear()+'-'+(month<10 ? '0' : '')+month+'-'+ (day<10 ? '0' : '')+day+' '+time ;

  var gName=cookieUtil.getCookie('name');
  var gPic=cookieUtil.getCookie('pic');

  $('.mb_center li:first-child').before('<li><img src="'+gPic+'" alt="图片"><p><span>'+gName+'</span>发表于'+output+'</p><p>'+con+'</p></li>')
  $('#back_con').val('');
})

$.ajax({
  type:'get',
  url:'../json/index.json',
  success:function(r){
    console.log(r[3].back[0].src);
    for(var i=0;i<r[3].back.length;i++){
      $('.mb_center').append('<li><img src="'+r[3].back[i].src+'" alt="图片"><p><span>'+r[3].back[i].user+'</span>发表于'+r[3].back[i].time+'</p><p>'+r[3].back[i].content+'</p></li>')
      $('.mi_user ul').append('<li><img src="'+r[3].back[i].src+'" alt="图片"><span>'+r[3].back[i].user+'</span></li>')
    }
  }
})
