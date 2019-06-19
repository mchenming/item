$(function(){
    $.ajax({
        url:"/user/queryUser",
        type:"get",
        data:{
            page:1,
            size:10
        },
        success:function(res){
            console.log(res)
            var str=template("tmpInfo",res)
            // console.log(str)
            $(".table").html(str)
        }
    })
    $(".table").on("click",".change",function(){
        // alert(123)
        var id =$(this).attr("data-id")
        console.log(id)
        var isDel=$(this).attr("data-isDel")
        console.log(isDel)
        $.ajax({
            url:"/user/updateUser",
            type:"post",
            data:{
                id:id,
                isDelete:isDel
            },
            success:function(res){
                console.log(res)
                if(res.success){
                    location.reload()

                }
            }
        })
    })
})