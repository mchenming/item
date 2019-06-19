$(function () {
    var id = location.search.split("=")[1]
    console.log(id)
    $.ajax({
        url: "/product/queryProductDetail",
        type: "get",
        data: {
            id: id
        },
        success: function (res) {
            console.log(res)
            var str = template("productInfo", res)
            console.log(str)
            $(".mui-content").html(str)
            $(".mui-content").on("tap", ".size span", function () {
                $(this).addClass("active").siblings().removeClass("active")
            })
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui('.mui-numbox').numbox()
        }
    })
})