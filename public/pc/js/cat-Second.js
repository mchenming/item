$(function () {
    // 选择的图片地址路径logo
    var logo
    $('#fileUpload').fileupload({
        dataType: 'json',
        url:"/category/addSecondCategoryPic",
        done: function (e, data) {
            // brandData.brandLogo = data._response.result.picAddr;
            // var imgUrl = data._response.result.picAddr;
            // $("#showBrand").attr("src", imgUrl);
            // data-url="/category/addSecondCategoryPic"
            console.log(data.result.picAddr)
            // data._response.result.picAddr;
            logo=data.result.picAddr
            $("#showBrand").attr("src", data.result.picAddr)
        }
    });

    // 二级添加分类
    $(".save").on("click", function () {
        var id = $(".other").val()
        var spname = $(".spname").val()
        // var src =("#showBrand")
        console.log(id)
        console.log(spname)
        console.log(logo)
        $.ajax({
            
            url: "/category/addSecondCategory",
            type: "post",
            beforeSend:function(){
                if(id.trim()==""){
                    alert("请选择商品分类")
                    return false
                }
                if(spname.trim()==""){
                    alert("请输入品牌名称")
                    return false
                }
                if(logo.trim()==""){
                    alert("请选择图片路径")
                    return false
                }
            },
            data: {
                brandName: spname,
                categoryId: id,
                brandLogo: logo,
                hot: 0
            },
            success: function (res) {
                console.log(res)
                if (res.success) {
                    location.reload()
                }
            }
        })
    })


    var page = 1
    var pageSize = 10
    var num = 0
    // 二级分类

    getData()


    $("#prevBtn").on("click", function () {
        page--
        console.log(num)
        if (page < 1) {
            alert("已经是第一页了")
            page = 1
            return
        } else {
            getData()
        }
    })

    $("#nextBtn").on("click", function () {
        page++
        // console.log(page)
        // console.log(num)
        if (page > num) {
            page = num
            alert("已经是最后一页了,没有更多数据了")
            return
        } else {
            getData()
        }
    })


    // 一级分类
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        type: "get",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            console.log(res)
            var str = template("firstInfo", res)
            console.log(str)
            $(".other").html(str)
        }
    })




    function getData() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "get",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                console.log(res)
                num = Math.ceil(res.total / 10)
                // console.log(num)
                var str = template("secondInfo", res)
                // console.log(str)
                $("tbody").html(str)
            }
        })
    }
})