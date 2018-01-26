$(function() {

    function mouseleaveFunc() {
        //导航栏下划线，切换语言，需重新调整
        var navActive = document.querySelector(".nav-active");
        var navUnderline = document.querySelector('.nav ul');
        if (navActive) {
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
        console.log(txt)
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
        // web
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

        //moblie
        $('#page-list li').eq(i).find('a').click(function() {
            var href = $(this).attr("data-href");
            var txt = $('#slide_lang dt').text().trim()
            if (href == undefined) { return; }
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


            // 导航栏
            $('.nav').removeClass('en-nav')


            //首页section1
            $('.section1 .picasso-txt span').css('display', 'none')
            $('.section1 .picasso-txt img').css('display', 'inline-block')

            //首页section2
            $('.section2 .lab-text').removeClass('en-s2-p')

            // 首页 优势 section3-4
            $('.advantage .title p').removeClass('en-s3-bigTitle')
            $('.advantage .title img').removeClass('en-s3-img')
            $('.advantage .content-title span').removeClass('en-s3-title')
            $('.advantage .content-title img').removeClass('en-s3-img')
            $('.advantage .box-content .content-txt').removeClass('en-s3-txt')


            // 首页 下载 section5
            $('.download .box-2-title .down-app').removeClass('en-s5-app')
            $('.download .box-2-title img').removeClass('en-s5-img')
            $('.download .box-2-title .titile-2 span').removeClass('en-s5-txt')

            // 资产管理页面, 
            $('.assets-title img').removeClass('en-as-img')
            $('.assets-title p').removeClass('en-as-title')
            $('#totalsData .content-btn button').removeClass('en-as-btn')

            // 首页导航下划线，长度定位调整

            mouseleaveFunc()


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

            // 导航栏
            $('.nav').addClass('en-nav')

            //首页section1
            $('.section1 .picasso-txt span').css('display', 'block')
            $('.section1 .picasso-txt img').css('display', 'none')

            //首页section2
            $('.section2 .lab-text').addClass('en-s2-p')

            // 首页 优势 section3-4
            $('.advantage .title p').addClass('en-s3-bigTitle')
            $('.advantage .title img').addClass('en-s3-img')
            $('.advantage .content-title span').addClass('en-s3-title')
            $('.advantage .content-title img').addClass('en-s3-img')
            $('.advantage .box-content .content-txt').addClass('en-s3-txt')

            // 首页 下载 section5
            $('.download .box-2-title .down-app').addClass('en-s5-app')
            $('.download .box-2-title img').addClass('en-s5-img')
            $('.download .box-2-title .titile-2 span').addClass('en-s5-txt')


            // 资产管理页面,  操作那块的按钮样式和弹出框layer的样式，类名直接加在JS那生成的部分
            $('.assets-title img').addClass('en-as-img')
            $('.assets-title p').addClass('en-as-title')
            $('#totalsData .content-btn button').addClass('en-as-btn')

            // 首页导航下划线，长度定位调整

            mouseleaveFunc()


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