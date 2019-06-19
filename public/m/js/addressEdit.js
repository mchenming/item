$(function () {
    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);
    $("#selectCity").on("tap", function () {
        picker.show(function (selectItems) {
            console.log(selectItems)
            $("#selectCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })

    var str = JSON.parse(localStorage.getItem("address"))
    console.log(str)
    // $('[name="userName"]').val("hello")
    var id =str.id
    $('[name="userName"]').val(str.recipients)
    $('[name="yznum"]').val(str.postCode)
    $('[name="where"]').val(str.address)
    $('[name="address"]').val(str.addressDetail)

    $(".btn-sure").on("tap",function(){
        var userName=$('[name="userName"]').val()
        var yznum=$('[name="yznum"]').val()
        var where=$('[name="where"]').val()
        var address=$('[name="address"]').val()
        // console.log(userName)
        // console.log(yznum)
        // console.log(where)
        // console.log(address)
        $.ajax({
            url:"/address/updateAddress",
            type:"post",
            dataType:"json",
            beforeSend:function(){
                if(userName.trim()==""){
                    mui.toast("请输入收件人姓名")
                    return false
                }
                if(yznum.trim()==""){
                    mui.toast("请输入邮政编号")
                    return false
                }
                if(where.trim()==""){
                    mui.toast("请选择地址")
                    return false
                }
                if(address.trim()==""){
                    mui.toast("请输入详细地址")
                    return false
                }
            },
            data:{
                id:id,
                address:where,
                addressDetail:address,
                recipients:userName,
                postcode:yznum
            },
            success:function(res){
                console.log(res)
                if(res.success){
                    mui.toast("地址修改成功")
                    setTimeout(function(){
                        location.href="addRess.html"
                    },1500)
                }
            }
        })
    })
})