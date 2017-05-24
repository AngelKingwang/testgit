$.ajax({
  type:'get',
  url:'http://localhost:3000/jobInfo_1/find',
  success:function(data){
    for(var i=0;i<data.length;i++){
       $('.jobknow ul').append('<li><a href="jobInfo_1.html">'+data[i].Title+'</a><span>'+data[i].time+'</span></li>')
    }

    $('.cb_h2').append(data[0].Title);
    $('.c_zhao').append(data[0].content);
    $('.c_zhao h4').append(data[0].time);
  }
})

$.ajax({
  type:'get',
  url:'http://localhost:3000/jobInfo/find',
  success:function(data){
    for(var i=0;i<data.length;i++){
       $('.face ul').append('<li><a href="jobInfo_1.html">'+data[i].Title+'</a><span>'+data[i].time+'</span></li>')
    }
  }
})
