
    //这个是注册页面的ajax请求

    //通过点击获取验证码的按钮来发送ajax请求向后台获取验证码
$(function(){
    // var vCode
    $(".requestNum").on("tap",function(){
        $.ajax({
            url:"/user/vCode",
            success:function(res){
                console.log(res.vCode)
                //输出获取来的验证码
            }
        })
    })

    //点击点击注册按钮发送ajax请求

    //获取页面的输入的信息
    //beforeSend 验证输入信息的格式
    $("#newUser").on("tap",function(){
        var userName=$("#userName").val()
        var phone=$("#phone").val()
        var pwd=$("#pwd").val()
        var testPwd=$("#testPwd").val()
        var registerNum=$("#registerNum").val()
        $.ajax({
            url:"/user/register",
            type:"post",
            beforeSend:function(){
                if(userName.trim()==""){
                    mui.toast("请输入正确的用户名")
                    //如果格式不对退出后面的ajax请求不执行
                    return false
                }
                var reg = /^1\d{10}$/
                if(!reg.test(phone)){
                    mui.toast("电话号码错误")
                    return false 
                }
                if(pwd!==testPwd){
                    mui.toast("两次密码不一样，请重新输入")
                    return false 
                }
                if(registerNum.trim()==""){
                    mui.toast("请输入验证码")
                    return false
                }
            },
            //传入获取来的页面信息
            data:{
                username:userName,
                password:pwd,
                mobile:phone,
                vCode:registerNum
            },
            dataType:"json",
            // 请求成功后返回的函数
            success:function(res){
                if(res.success){
                    mui.toast("注册成功")
                    setTimeout(function(){
                        //如果返回的数据res.success为true那么两秒后跳转到登录页面
                        location.href="login.html"
                    },1500)
                }else{
                    //如果返回的结果为false则返回提示信息
                    mui.toast(res.message)
                }
                console.log(res) 
                
            }
            
        })
    })
    
})