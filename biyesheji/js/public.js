var pNum=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
var pWord=/^\w{6,12}$/;

$('#number').blur(function(){
    fn(pNum,$('#number'),'teltrue','tel')
})
$('#number').focus(function(){
    $(this).parent().removeClass('tel').removeClass
    ('teltrue')
})

$('#password').blur(function(){
    fn(pWord,$('#password'),'pWordtrue','pWord')
})
$('#password').focus(function(){
    $(this).parent().removeClass('pWordtrue').removeClass
    ('pWord')
})
$('#repass').blur(function(){
    var rePass=$(this).val();
    var pWord=$('#password').val();
    if(rePass==pWord){
        $(this).parent().addClass('repWordtrue')
    }else{
        $(this).val('')
        $(this).parent().addClass('repWord')
    }
})
$('#repass').focus(function(){
     $(this).parent().removeClass('repWordtrue').removeClass('repWord')
})
$('.yanzheng').html(yzm(4));
$('#mess').blur(function(){
    var yan=$('.yanzheng').html();
    var mess=$(this).val();
    if(mess==yan){
        $(this).parent().addClass('bianmatrue')
    }else{
        $(this).val('')
        $(this).parent().addClass('bianma')
    }
})
$('#mess').focus(function(){
     $(this).parent().removeClass('bianmatrue').removeClass('bianma')
})


$('#r_btn').click(function(){
  var name=$('#name').val();
  var password=$('#password').val();
  var schID=$('#schoolId').val();
  var pic='ban-tag.jpg';
  var birthday=$('#birthday').val();
  var number=$('#number').val();
  var nicheng=$('#nicheng').val();
  var mail=$('#mail').val();
  var qq=$('#QQ').val();
  var weixin=$('#weixin').val();
  var dream=$('#dream').val();
  var xingzuo=$('#xingzuo').val();
  var music=$('#music').val();
  var sports=$('#sports').val();
  var game=$('#game').val();
  var idol=$('#idol').val();
  var color=$('#color').val();
  var liuyan=$('#liuyan').val();
  console.log(schID+'/'+pic+'/'+name+'/'+password+'/'+birthday+'/'+number+'/'+xingzuo+'/'+nicheng+'/'+mail+'/'+dream+'/'+qq+'/'+weixin+'/'+music+'/'+sports+'/'+game+'/'+idol+'/'+color+'/'+liuyan)

  $.ajax({
    url:'http://localhost:3000/data/insert/'+schID+'/'+pic+'/'+name+'/'+password+'/'+birthday+'/'+number+'/'+xingzuo+'/'+nicheng+'/'+mail+'/'+dream+'/'+qq+'/'+weixin+'/'+music+'/'+sports+'/'+game+'/'+idol+'/'+color+'/'+liuyan,
    success:function(){

    }
  })

  alert('注册成功！');
  // window.history.go(-1);
})

$('#login').click(function(){
  $('.mark').show();
})
$('.lg').click(function(){
  var pn=$('#p_number').val();
  var pI=$('#schoolId').val();
  var pw=$('#p_password').val();
  var pSI=pI.slice(0,6);

  $('.c_list li').remove();
  $.ajax({
    type:'get',
    url:'http://localhost:3000/data/find',
    success:function(data){

      for(var i=0;i<data.length;i++){
        var dID=data[i].ID.slice(0,6);

        if(pn==data[i].name&&pw==data[i].password){
          alert('登录成功！');
          cookieUtil.setCookie('name',pn,1);
          cookieUtil.setCookie('password',pw,1);
          cookieUtil.setCookie('ID',data[i].ID,1);
          cookieUtil.setCookie('pic',data[i].pic,1);
          history.go(0)
        }
        if(pSI==dID){
          $('.mark').hide();
          $('.c_list').append('<li><img src="'+data[i].pic+'" alt=""><p>'+data[i].name+'</p><p>'+data[i].frends+'</p></li>')
          $('.c_list').attr('dataId',data[i].ID);
        }
      }
    }
  })
})

$('#next').click(function(){
  $('.r_form').hide();
  $('#r_left').show();
  $('#r_btn').show();
})

var oStr=cookieUtil.getCookie('name');
var oId_s=cookieUtil.getCookie('ID');
var oId=oId_s.slice(0,6);
if(oStr!='undefined'){
  $('.login p a').remove();
  $('.login p').append(oStr+'，已登录');
}

function fn(reg,obj,c1,c2){
    var val=obj.val();
    if(reg.test(val)){
        obj.parent().addClass(c1);
    }else{
        obj.parent().addClass(c2);
        obj.val('');
    }
}
function yzm(len){
  var str = '';
  for(var i = 0;i < len;){
      var num = Math.floor(Math.random()*75 + 48);
      if(num<=57||(num>=65&&num<=90)||num>=97){
          var code = String.fromCharCode(num);
          str+=code;
          i++;
      }
  }
  return str;
}
