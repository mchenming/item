// import { template } from "handlebars";


//当直接点击到主页时向后台发送ajax请求
// 判断当前页面的登录状态
var obj=null
$.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    //同步实现   如果上面的代码不执行完 ，下面的代码不执行
    async:false,
    success:function(res){
        console.log(res)
        //如果当前状态为未登录状态那么跳转到登录页面
        if(res.error && res.error==400){
            location.href="login.html"
        }
        // else则为成功登录后的页面用户数据信息
        //在外部全局定义一个全局变量将返回的对象  赋值给全局的对象
        obj=res
    }

})

//点击退出按钮发送ajax请求   后台代码执行语句
$(function(){
    $(".exit").on("click",function(){
        $.ajax({
            url:"/user/logout",
            type:"get",
            success:function(res){
                console.log(res)
                if(res.success){
                    //如果返回值为success那么说明请求退出成功

                    //两秒后跳转到主页
                    mui.toast("退出成功")
                    setTimeout(function(){
                        location.href="index.html"
                    },1500)
                }
            }
        })
    })
})