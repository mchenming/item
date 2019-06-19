$(function () {
    // 页面的渲染  传接口直接调用数据
    var page = 1
    var pageSize = 5
    var num=0

    getData()
    // 页面渲染和点击上下页切换
    $("#prevBtn").click(function(){
        page--
        if(page<1){
            page=1
            alert("已经是第一页了")
        }else{
            getData()
        }
    })
    $("#nextBtn").click(function(){
        page++
        console.log(num)
        if(page>num){
            page=num
            alert("已经是最后一页了")
        }else{
            getData()
        }
    })

    // 页面渲染输入
    function getData() {
        $.ajax({
            url: "/product/queryProductDetailList",
            type: "get",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                console.log(res)
                var str = template("productInfo", res)
                num=Math.ceil(res.total/pageSize)
                // console.log(num)
                $("tbody").html(str)
            }
        })
    }

    // 通过查询二级分类管理的接口给select的option遍历值id值
    $.ajax({
        url:"/category/querySecondCategoryPaging",
        type:"get",
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            console.log(res)
            var str =template("addInfo",res)
            // console.log(str)
            $("#selectLogo").html(str)
        }
    })

    var picSrc
    var picName
    // var statu
    // 文件加载获取图片路径
    $('#fileUpload').fileupload({
        // type:"post",
        dataType: 'json',
        // url:"/category/addSecondCategoryPic",
        url:"/product/addProductPic",
        done: function (e, data) {
            console.log(data)
            picName=data.result.picName
            picSrc=data.result.picAddr
            var img=new Image()    //==> document.craetElement("img")
            img.src =data.result.picAddr
            console.log(picSrc)
            console.log(picName)
            // img.appendTo($(".picBox"))
            // $(".picBox").append(img)
            $(img).appendTo($(".picBox"))

            // console.log(data)
            // $("#showBrand").attr("src", data.result.picAddr)
        }
    });

    $("#addProduct").on("click",function(){
        // alert(123)
        var id =$("#selectLogo").val()
        console.log(id)
        var productName =$('[name="productName"]').val()
        var productMes=$('[name="productMes"]').val()
        var productNum=$('[name="productNum"]').val()
        var productSize=$('[name="productSize"]').val()
        var productOldPir=$('[name="productOldPir"]').val()
        var productNewPir=$('[name="productNewPir"]').val()
        // console.log(productName)

        // 增加商品ajax
        $.ajax({
            url:"/product/addProduct",
            type:"post",
            data:{
                proName:productName,
                oldPrice:productOldPir,
                price:productNewPir,
                proDesc:productMes,
                size:productSize,
                statu: 0,
                num:productNum,
                brandId:id,
                pic:[{"picName":picName,"picAddr":picSrc},{"picName":picName,"picAddr":picSrc},{"picName":picName,"picAddr":picSrc}]
            },
            success:function(res){
                console.log(res)
                if(res.success){
                    location.reload()
                }
            }
        })
    })
    // 按钮启用上架下架按钮
    $("tbody").on("click",".change",function(){
        var id =$(this).attr("data-id")
        // console.log(id)
        var statu=$(this).attr("data-del")
        console.log(statu)
        var name =$(this).parent().siblings("td:nth-of-type(1)").text()
        var proName=$(this).parent().siblings("td:nth-of-type(2)").text()
        var oldPrice=$(this).parent().siblings("td:nth-of-type(4)").text()
        var price=$(this).parent().siblings("td:nth-of-type(5)").text()
        var proDesc=$(this).parent().siblings("td:nth-of-type(3)").text()
        var size=$(this).parent().siblings("td:nth-of-type(5)").text()
        var num=$(this).parent().siblings("td:nth-of-type(4)").text()
        var brandId=$(this).parent().siblings("td:nth-of-type(2)").text()
        // console.log(name)
        // console.log(proName)
        
        $.ajax({
            url:"/product/updateProduct",
            type:"post",
            data:{
                id:id,
                statu:statu,
                proName,
                oldPrice,
                price,
                proDesc,
                size,
                num,
                brandId
            },
            success:function(res){
                console.log(res)
                console.log(statu)
                getData()
            }
        })
    })
})