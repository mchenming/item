$(function(){
    //点击登录按钮发送ajax请求
    $("#newUser").on("click",function(){
        //获取页面的输入信息
        var userName =$("#userName").val()
        var pwd =$("#pwd").val()

        //发送请求传入参数
        $.ajax({
            url:"/user/login",
            type:"post",
            //验证输入信息的格式是否合格
            beforeSend:function(){
                if(userName.trim()==""){
                    mui.toast("请输入用户名")
                    //如果页面信息不符号那么退出ajax请求后面的请求不执行
                    return false 
                }
                if(pwd.length==0){
                    mui.toast("请输入密码")
                    return false 
                }
            },
            //传入请求参数
            data:{
                username:userName,
                password:pwd
            },
            success:function(res){
                console.log(res)
                //如果请求的返回值res返回值为success
                if(res.success){
                    //那么弹出提示框        两秒后跳转到个人主页
                    mui.toast("登录成功")
                    setTimeout(function(){
                        location.href="user.html"
                    },2000)
                }else{
                    // 如果返回的数据为error那么  报错提示用户重新输入
                    mui.toast(res.message)
                }
            }
        })
    })
})