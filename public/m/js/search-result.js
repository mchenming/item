// 在全局定义一个全局变量改变this的指向window
var This=null
$(function(){
    // 接收变量搜索传递进来的搜索值
    var address=location.search.split("=")[1]
    // console.log(address)
   var price =1
    var num =1
    // var html = ""
    var page = 1
    var str =""

    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:30,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });

function getData(){
    if(!This){
        This=this
    }
    $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:{
            price:price,
            num:num,
            page:page++,
            pageSize:3
        },
        success:function(res){
            console.log(res)
            if(res.data.length>0){
                str+=template("searchInfo",res)
                $("#addressUL").html(str)
				This.endPullupToRefresh(false);
            }else{
				This.endPullupToRefresh(true);
            }
        }
    })
}
// getData()

    $(".pirce").on("tap",function(){
        page=1
        mui('#refreshContainer').pullRefresh().refresh(true);
        str=""
        price= price ==1? 2:1
        
        console.log(price)
        getData()
    })
    $(".shellNum").on("tap",function(){
        page=1
        mui('#refreshContainer').pullRefresh().refresh(true);
        str=""
        num= num==1? 2 : 1
        console.log(num)
        getData()
    })

})