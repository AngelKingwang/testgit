waterfall();
$('.btn').click(function(){
  waterfall();
})

$('.sou').click(function(){
  window.location.href='res.html';
})

function waterfall(){
  $.ajax({
    type:'get',
    url:'http://localhost:3000/school/find',
    success:function(r){
      for(i=0;i<r.length;i++){
        $('.waterfall').append('<div class="grid"><a href="#"><img src="'+r[i].src+'"><p>'+r[i].timu+'</p></a></div>')
      }
      var colHeight = [0,0,0,0];
      $grids = $(".grid");
      var arr=[];
      $grids.each(function(){
          var sum = 0;
          var sum1 = 0;
          var sum2 = 0;
          var sum3 = 0;
          var sum4 = 0;
          for(var i = $(this).index() - 4 ; i >= 0 ; i-=4){
              sum += $grids.eq(i).outerHeight() + 20;
          }
          $(this).css({
              "top" : sum,
              "left" : ($(this).index() % 4) * 240
          })
          var Index=$(this).index();
          arr.push(Index);
          for(j=0;j<arr.length;j++){
            if(arr[j]%4==0){
              sum1=sum1+$(".grid").eq(arr[j]).outerHeight();
            }else if (arr[j]%4==1) {
              sum2=sum2+$(".grid").eq(arr[j]).outerHeight();
            }else if (arr[j]%4==2) {
              sum3=sum3+$(".grid").eq(arr[j]).outerHeight();
            }else if (arr[j]%4==3) {
              sum4=sum4+$(".grid").eq(arr[j]).outerHeight();
            }
          }
          var colHeight=[sum1,sum2,sum3,sum4];
          for (var i = 0; i < colHeight.length - 1; i++){
            for (var j = 0; j < colHeight.length - 1 - i; j++){
                if (colHeight[j] > colHeight[j + 1]){
                    var temp = colHeight[j + 1];
                    colHeight[j + 1] = colHeight[j];
                    colHeight[j] = temp;
                }
            }
          }
          $('.waterfall').css("height",colHeight[3]+50);
          console.log(colHeight)
          // minValue = _.min(colHeight);
          // minIndex = _.indexOf(colHeight,minValue);
          // $grid.css({
          //     "top" : minValue,
          //     "left" : minIndex * 240
          // });
          // colHeight[minIndex] += $grid.outerHeight() + 10;
          //
      });
    }
  })
}
