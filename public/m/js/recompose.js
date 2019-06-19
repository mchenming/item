$(function(){
    // 修改密码
    //1.获取修改的点击按钮并添加点击事件
    // 2.获取用户输入的信息
    // 3.对用户输入的信息做校验
    // 4.调用修改密码接口实现修改密码功能
    // 5.跳转到登录页面实现跳转

    //获取验证码
    $(".reqNum").on("tap",function(){
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res){
                console.log(res)
            }
        })
    })


    //获取用户输入的初始值
    $(".recompase").on("tap",function(){
        var pwd =$("[name='pwd']").val()
        var newPwd =$("[name='newPwd']").val()
        var testPwd =$("[name='testPwd']").val()
        var sureNum=$("[name='sureNum']").val()
        // console.log(pwd)
        // console.log(newPwd)
        // console.log(testPwd)
        
        $.ajax({
            url:" /user/updatePassword",
            type:"post",
            beforeSend:function(){
                // beforeSend校验用户输入的信息是否父盒要求
                if(pwd.trim()==""){
                    mui.toast("请输入密码")
                    return false 
                }
                // 密码不是为空
                //  老密码和新更改的密码不能一样
                // 检验两次输入的确认密码是否一致
                // 检验用户书否输入了验证码
                if(newPwd.trim()=="" && testPwd.trim()==""){
                    mui.toast("请输入验证码")
                    return false 
                }
                if(pwd===newPwd){
                    mui.toast("密码未更改，请重新输入")
                    return false
                }
                if(newPwd!==testPwd){
                    mui.toast("两次新密码不一致，请重新输入新密码")
                    return false 
                }
                if(sureNum.trim()==""){
                    mui.toast("请输入验证码")
                    return false 
                }
            },
            data:{
                oldPassword:pwd,
                newPassword:newPwd,
                vCode:sureNum
            },
            success:function(res){
                console.log(res)
                if(res.success){
                    mui.toast("修改成功")
                    setTimeout(function(){
                        location.href="login.html"
                    },1500)
                }else{
                    mui.toast(res.message)
                }
            }
        })

    })

})