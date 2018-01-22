// 部分效果控制


$(function() {
    $('.topbar-btn').on('click', function() {
        $('.navbar').show().removeClass('zoomOut').addClass('fadeInDown');
    })
    $('.navbar').click(function() {
        $('.navbar').removeClass('fadeInDown').addClass('zoomOut');
        setTimeout(function() {
            $('.navbar').hide()
        }, 500)
    })
    $('#slide_lang').click(function() {
        $('#slide_lang_box').toggle()
    })
})

//导航条 翻译选择 start
$('.web-language a').click(function() {
    $('.option').css("display", "block")


})

$('.select .switch').click(function(e) {
    var e = e || window.e;
    var obj = e.target || e.srcElement;
    e.stopPropagation()
    $('.option').css("display", "none")

})

$('.nav').mouseleave(function() {
    $('.option').css("display", "none")
})

//导航条 翻译选择 end

// 导航下划线
var target = document.querySelector(".target");
var links = document.querySelectorAll(".tag");
var color = ["#b7a87b"];


function mouseenterFunc() {
    navActive = document.querySelector(".nav-active");
    if (!this.parentNode.classList.contains("nav-active")) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].parentNode.classList.contains("nav-active")) {
                links[i].parentNode.classList.remove("nav-active");
            }
        }

        var width = this.getBoundingClientRect().width;
        var height = this.getBoundingClientRect().height;
        var left = this.getBoundingClientRect().left + window.pageXOffset;
        var top = this.getBoundingClientRect().top + window.pageYOffset;

        target.style.width = width + "px";
        target.style.height = height + "px";
        target.style.left = left + "px";
        target.style.top = top + "px";
        target.style.borderColor = color;
        target.style.borderWidth = '3px'
        target.style.transform = "none";
        target.style.zIndex = 1;
    }

}



for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseenter", mouseenterFunc);

    links[i].onclick = function() {
        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("nav-active");
        }
        this.classList.add("nav-active")
    };
}


function resizeFunc() {
    var active = document.querySelector(".nav-active");

    if (active) {
        var left = active.getBoundingClientRect().left + window.pageXOffset;
        var top = active.getBoundingClientRect().top + window.pageYOffset;

        target.style.left = left + "px";
        target.style.top = top + "px";
    }



}


window.addEventListener("resize", resizeFunc);