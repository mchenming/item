$(function () {
    // 获取当前的所有数据的最大页面
    var num=0       
    var page = 1
    var pageSize = 10

    getData()

    // console.log(Math.ceil(num/10))


    // 点击下一页加载输入调用ajax请求函数
    $(".next").on("click",function(){
        page++
        // 当页面比最大页面大时不执行函数  弹出提示框
        console.log(num)
        if(page>num){
            alert("没有跟多数据了，已经是最后一页了")
            page=num
        }else{
            getData()
        }
        // console.log(num)
    })

    $(".prev").on("click",function(){
        page--
        console.log(num)

        if(page<1){
            alert("没有跟多数据了，已经是第一页了")
            page=1
        }else{
            getData()
        }
        // console.log(num)
    })

    $(".save").on("click", function () {
        var text = $(".otherCls").val()
        console.log(text)
        $.ajax({
            url: "/category/addTopCategory",
            type: "post",
            beforeSend: function () {
                if (text.trim() == "") {
                    alert("请输入分类名称")
                    return false
                }
            },
            data: {
                categoryName: text
            },
            success: function (res) {
                console.log(res)
                if (res.success) {
                    location.reload()
                }
            }
        })
    })


    function getData() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                console.log(res)
                // num=res.total
                // 最多的页面数
				num = Math.ceil(res.total/pageSize);

                var str = template("showInfo", res)
                // console.log(str)
                // console.log(num)
                $("tbody").html(str)
            }
        })
    }
    // console.log(num)
})