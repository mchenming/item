$(function () {
    var addressList =null
    $.ajax({
        url: "/address/queryAddress",
        type: "get",
        success: function (res) {
            console.log(res)
            addressList=res
            var str = template("addInfo", { data: res })
            // console.log(str)
            $(".addAddress").html(str)
        }
    })


    $("#addRess").on("tap", ".delect-btn", function () {
        // console.log(message)
        // console.log(123)
        var id = $(this).parent().attr("data-id")
        console.log(id)
        mui.confirm("确认删除吗？", function (message) {
            // console.log(message)
            if (message.index == 1) {
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data: {
                        id: id
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.success) {
                            location.reload()
                        }
                    }
                })
            }else{
                location.reload()
            }
        })
    })
    $("#addRess").on("tap", ".edit-btn", function (){
        // alert(12)
        var id = $(this).parent().attr("data-id")
        console.log(id)        
        for(var i=0;i<addressList.length;i++){
            if(id==addressList[i].id){
                localStorage.setItem("address",JSON.stringify(addressList[i]))
                location.href="addressEdit.html"
                break
            }
        }
    })
})
// console.log(123)