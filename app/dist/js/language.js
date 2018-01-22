$(function() {


    $(function() {

        // 导航栏下划线，转换语言需重新定位
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

        // 导航栏 跳转到首页的 3个链接，首页的锚点用来定义轮播位置，所以用?作为标志转换语言
        for (var i = 0; i < 3; i++) {
            $('.web-nav li').eq(i).click(function(e) {
                var txt = $('#slide_lang dt').text();
                var href = e.target.dataset.href;
                if (href != undefined) {
                    if (txt == "简体中文") {

                        href = href + "?cn";
                    } else {
                        href = href + "?en";
                    }
                    location.href = href


                }
            })
        }

        // 导航栏切换语言
        $('#slide_lang_box').click(function(e) {
            var e = e || window.event;

            if (e.target.text == "简体中文") {
                location.href = "#cn"
                cn();
            } else {
                location.href = "#en"
                en()
            }
        })
        $('#lan_exchange').click(function(e) {


            if ($(this).text() == "简体中文") {
                en();
            } else {
                cn()
            }
        })

        // 资产管理 链接
        $('.assets').click(function() {
            var txt = $('#slide_lang dt').text();
            var href = $(this).attr("data-href");

            if (txt == "简体中文") {

                window.location.href = href + "#cn";
            } else {
                window.location.href = href + "#en";
            }
        })



        // 导航栏 登录 链接
        $('.moblie-nav a,.web-nav .login a').click(function() {
            var txt = $('#slide_lang dt').text();
            var href = $(this).attr("data-href");

            if (txt == "简体中文") {

                window.location.href = href + "#cn";
            } else {
                window.location.href = href + "#en";
            }
        })

        // 页脚 3个链接
        $('.down-foot ol a').click(function() {
            var txt = $('#slide_lang dt').text();
            var href = $(this).attr("data-href");


            if (txt == "简体中文") {

                href = href + "#cn";
            } else {
                href = href + "#en";
            }
            window.open(href);
        })

        function cn() {
            i18n.init({
                resGetPath: './dist/language/cn/__ns__.json'
            }, function(t) {
                // i18n est maintenant initialisé
                $('body').i18n();


                // 首页
                $('.picasso-txt img,.advantage-title .title img,.content-title img,.box-2-title img').css('display', 'inline-block')
                $('.picasso-txt span,.advantage-title .title p,.content-box .content-title span,.box-2-title .down-app').css('display', 'none')

                $('.nav').removeClass('en-nav')
                $('.section2 .lab-text .en-lab-text').addClass('lab-text-b')
                $('.section2 .lab-text .en-lab-text').removeClass('en-lab-text')
                $('.section3 .box-content .content-txt').removeClass('en-content-txt')
                $('.section3 .advantage .underline').css('display', 'block')
                $('.section4 .box-2-title .titile-2 span').removeClass('en-box-2-tile')
                    // 导航下划线，处理
                mouseleaveFunc()
            });
        }

        function en() {
            i18n.init({
                resGetPath: './dist/language/en/__ns__.json'
            }, function(t) {
                // i18n est maintenant initialisé
                $('body').i18n();


                // 首页
                $('.picasso-txt img,.advantage-title .title img,.content-title img,.box-2-title img').css('display', 'none')
                $('.picasso-txt span,.advantage-title .title p,.content-box .content-title span,.box-2-title .down-app').css('display', 'inline-block')

                $('.nav').addClass('en-nav')
                $('.section2 .lab-text .lab-text-b').addClass('en-lab-text')
                $('.section2 .lab-text .lab-text-b').removeClass('lab-text-b')

                $('.section3 .box-content .content-txt').addClass('en-content-txt')
                $('.section3 .advantage .underline').css('display', 'none')
                $('.section4 .box-2-title .titile-2 span').addClass('en-box-2-tile')
                    // 导航下划线，处理
                mouseleaveFunc()
            });
        }



        //判断语言类型
        var lj = window.location.hash;
        if (lj == "#en") {
            en();
        }
        if (lj == "#cn") {
            cn();
        };

        // 首页的锚点用来定义轮播位置，所以用?作为标志转换语言，并重定义锚点
        var homeLj = window.location.hash
        if (homeLj.indexOf('?cn') != -1) {

            var ljArr = homeLj.split("?");
            location.href = ljArr[0]
            cn();

        }
        if (homeLj.indexOf('?en') != -1) {

            var ljArr = homeLj.split("?");
            location.href = ljArr[0]
            en();
        }
    })

})