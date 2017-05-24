var oStr=cookieUtil.getCookie('name');
var oId_s=cookieUtil.getCookie('ID');
var oId=oId_s.slice(0,6);

$.ajax({
  type:'get',
  url:'http://localhost:3000/data/find',
  success:function(data){
    for(var j=0;j<data.length;j++){
        $('.c_list').append('<li><img src="'+data[j].pic+'" alt=""><p>'+data[j].name+'</p><p>'+data[j].frends+'</p></li>')
    }
    if(oStr!='undefined'){
      $('.c_list li').remove();
      for(var i=0;i<data.length;i++){
        var sId=data[i].ID.slice(0,6);
        if(oId==sId){
          $('.c_list').append('<li dataid="'+data[i].ID+'"><img src="'+data[i].pic+'" alt=""><p>'+data[i].name+'</p><p>'+data[i].frends+'</p></li>')
        }
      }
    }
  }
})

$('.c_list').delegate('li','click',function(){
  var oID=$(this).attr('dataid');
  $('.content').hide();
  $('.main').show();
  $.ajax({
    type:'get',
    url:'http://localhost:3000/data/find',
    success:function(oData){
      for(var k=0;k<oData.length;k++){
        if(oID==oData[k].ID){
          $('.m-name p:nth-of-type(1) em').after(oData[k].name);
          $('.m-name p:nth-of-type(2) em').after(oData[k].birthday);
          $('.m-name p:nth-of-type(3) em').after(oData[k].tel);
          $('.m-name p:nth-of-type(4) em').after(oData[k].xingzuo);
          $('.m-name p:nth-of-type(5) em').after(oData[k].agname);
          $('.m-name p:nth-of-type(6) em').after(oData[k].dream);
          $('.m-name p:nth-of-type(7) em').after(oData[k].email);
          $('.m-name p:nth-of-type(8) em').after(oData[k].QQ);
          $('.m-name p:nth-of-type(9) em').after(oData[k].weixin);
          $('.m-name p:nth-of-type(10) em').after(oData[k].music);
          $('.m-name p:nth-of-type(11) em').after(oData[k].sports);
          $('.m-name p:nth-of-type(12) em').after(oData[k].game);
          $('.m-name p:nth-of-type(13) em').after(oData[k].idol);
          $('.m-name p:nth-of-type(14) em').after(oData[k].color);
          $('.m-frends').append(oData[k].frends);
        }
      }
    }
  })
})

$('.m-back').click(function(){
  $('.content').show();
  $('.main').hide();
})

function callback(r){
    var num=12;
    var pages=Math.ceil(r[2].company.length/num);
    for(var k=0;k<num;k++){
        if(r[2].company[k]){
            $('.c_list').append('<li><img src="'+r[2].company[k].pic+'" alt=""><p>'+r[2].company[k].name+'</p><p>'+r[2].company[k].frends+'</p></li>')
        }
    }

    for(var j=0;j<pages;j++){
        $('.c_btn').append('<li>'+(j+1)+'</li>')
    }
    $('.c_btn li').click(function(){
      console.log($(this).index());
      $('.c_list li').remove();
      $index=$(this).index();
      for(var i=$index*num+1;i<(1+$index)*num;i++){
        if(r[2].company[i]){
            $('.c_list').append('<li><img src="'+r[2].company[i].pic+'" alt=""><p>'+r[2].company[i].name+'</p><p>'+r[2].company[i].frends+'</p></li>')
        }
      }
    })
}

/*---------------company_1-----------------*/
console.log(oId_s);
