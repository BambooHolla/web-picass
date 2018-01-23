$(function() {
    //导航栏下划线，切换语言，需重新调整
    var navActive = document.querySelector(".nav-active");
    var navUnderline = document.querySelector('.nav ul');

    function mouseleaveFunc() {
        navActive = document.querySelector(".nav-active");
        var width = navActive.getBoundingClientRect().width;
        var height = navActive.getBoundingClientRect().height;
        var left = navActive.getBoundingClientRect().left + window.pageXOffset;
        var top = navActive.getBoundingClientRect().top + window.pageYOffset;
        target.style.width = width + "px";
        target.style.height = height + "px";
        target.style.left = left + "px";
        target.style.top = top + "px";
        target.style.borderColor = color;
        target.style.borderWidth = '3px'
        target.style.transform = "none";
        target.style.zIndex = 1;
    }


    // web导航栏语言切换
    $('#slide_lang_box a').click(function() {

        var txt = $(this).text().trim()
        if (txt == "简体中文") {
            cn();
        } else if (txt == "English") {
            en()
        } else {
            cn()
        }


    })

    // mobile导航栏语言切换
    $('#lan_exchange').click(function() {

        var txt = $(this).text().trim()
        if (txt == "简体中文") {
            en();
        } else if (txt == "English") {
            cn();
        } else {
            cn();
        }

    })

    // 导航跳转到资产管理,登录注册，去登入，去注册
    $('.asset,.web-nav .login a,.moblie-nav a,#goRegister,#goLogin').click(function() {
        var href = $(this).attr("data-href");
        var txt = $('#slide_lang dt').text().trim()

        if (txt == "简体中文") {
            window.location.href = href + "#cn";
        } else if (txt == "English") {
            window.location.href = href + "#en";

        } else {
            window.location.href = href
        }

    })

    // 导航跳到首页页面
    for (var i = 0; i < 3; i++) {
        $('.web-nav li').eq(i).click(function(e) {
            var e = e || window.event;
            var href = e.target.dataset.href
            if (href == undefined) { return; }
            var txt = $('#slide_lang dt').text().trim()
            if (txt == "简体中文") {
                window.location.href = href + "?cn";
            } else if (txt == "English") {
                window.location.href = href + "?en";

            } else {
                window.location.href = href
            }

        })
    }

    // 页脚 底部3个链接,跳转到用户协议
    $('.down-foot ol a,#userHref').click(function() {
        var href = $(this).attr("data-href");
        var txt = $('#slide_lang dt').text().trim()

        if (txt == "简体中文") {
            window.open(href + "#cn");
        } else if (txt == "English") {
            window.open(href + "#en");

        } else {
            window.open(href);
        }
    })



    // 简体中文
    function cn() {
        i18n.init({
            resGetPath: './dist/language/cn/__ns__.json'
        }, function(t) {
            // i18n est maintenant initialisé
            $('body').i18n();
            window.location.hash = '#cn'


            if (window.location.href.indexOf('index.html') != -1) {
                mouseleaveFunc()
            }

        });
    }

    // English
    function en() {
        i18n.init({
            resGetPath: './dist/language/en/__ns__.json'
        }, function(t) {
            // i18n est maintenant initialisé
            $('body').i18n();
            window.location.hash = '#en'


            if (window.location.href.indexOf('index.html') != -1) {
                mouseleaveFunc()
            }
        });
    }


    // 跳转到其他页面语言选择
    var lj = window.location.hash;
    if (lj == "#cn") {
        cn()
    }
    if (lj == "#en") {
        en()
    }

    // 跳转到主页语言选择，主页的#是用来定位轮播图的，用?标记语言
    var homeLj = window.location.hash;

    if (homeLj.indexOf("?cn") != -1) {
        var ljArr = homeLj.split('?')
        cn();
        location.href = ljArr[0]
    }
    if (homeLj.indexOf("?en") != -1) {
        var ljArr = homeLj.split('?')
        en();
        location.href = ljArr[0]
    }





})