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
            cn();
        } else if (txt == "English") {
            en();
        } else {
            cn();
        }

    })

    // 导航跳转到资产管理,登录注册，去登入，去注册
    $('.asset,.web-nav .login a,.moblie-nav a,#goRegister,#goLogin').click(function() {
        var href = $(this).attr("data-href");
        window.location.href = href;
       

    })

    // 导航跳到首页页面
    for (var i = 0; i < 3; i++) {
        // web
        $('.web-nav li').eq(i).click(function(e) {
            var e = e || window.event;
            var href = e.target.dataset.href
            if (href == undefined) { return; }
            
            window.location.href = href
        })

        //moblie
        $('#page-list li').eq(i).find('a').click(function() {
            var href = $(this).attr("data-href");
            if (href == undefined) { return; }
            window.location.href = href
        })
    }

    // 页脚 底部链接,跳转到用户协议
    $('#userHref').click(function() {
        var href = $(this).attr("data-href");
        if (href == undefined) { return; }
       
        window.open(href);
    })



    // 简体中文
    function cn() {
        window.localStorage.language = JSON.stringify("cn");
        i18n.init({
            resGetPath: './dist/language/cn/__ns__.json'
        }, function(t) {
            // i18n est maintenant initialisé
            $('body').i18n();


            // 导航栏
            $('.nav').removeClass('en-nav')


            //首页section1
            $('.section1 .picasso-txt span').css('display', 'none')
            $('.section1 .picasso-txt img').css('display', 'inline-block')

            //首页section2
            $('.section2 .lab-text').removeClass('en-s2-p')

            // 首页 优势 section3
            $('.advantage-title .title p').removeClass('en-s3-bigTitle')
            $('.advantage-title .title img').removeClass('en-s3-img')
            $('.swiper-slide .content-title span').removeClass('en-s3-title')
            $('.swiper-slide .content-title img').removeClass('en-s3-img')
            $('.swiper-slide .box-content .content-txt').removeClass('en-s3-txt')


            // 首页 下载 section4
            $('.download .box-2-title .down-app').removeClass('en-s5-app')
            $('.download .box-2-title img').removeClass('en-s5-img')
            $('.download .box-2-title .titile-2 span').removeClass('en-s5-txt')

            // 资产管理页面, 
            $('.assets-title img').removeClass('en-as-img')
            $('.assets-title p').removeClass('en-as-title')
            $('#totalsData .content-btn button').removeClass('en-as-btn')

             //登录页面，登录的密码placeholder是再注册页面设置的
             $('#login-submit').val('登录');
             $("#account").attr('placeholder',"请输入账号");

             //注册页面,placeholder主要在这修改
             $("#register").val("注册");
             $("#account1").attr('placeholder',"请输入手机号码"); 
             $("#account0").attr('placeholder',"请输入邮箱"); 
             $("#code").attr('placeholder',"请输入验证码"); 
             $(".pwd #password").attr('placeholder',"请输入登录密码"); 
             $(".againPwd #passwordAgain").attr('placeholder',"请输入确认密码"); 
             $("#recommendCode").attr('placeholder',"选填"); 


            // 首页导航下划线，长度定位调整

            mouseleaveFunc()


        });
    }

    // English
    function en() {
        window.localStorage.language = JSON.stringify("en");
        i18n.init({
            resGetPath: './dist/language/en/__ns__.json'
        }, function(t) {
            // i18n est maintenant initialisé
            $('body').i18n();

            // 导航栏
            $('.nav').addClass('en-nav')

            //首页section1
            $('.section1 .picasso-txt span').css('display', 'block')
            $('.section1 .picasso-txt img').css('display', 'none')

            //首页section2
            $('.section2 .lab-text').addClass('en-s2-p')

            // 首页 优势 section3
            $('.advantage-title .title p').addClass('en-s3-bigTitle')
            $('.advantage-title .title img').addClass('en-s3-img')
            $('.swiper-slide .content-title span').addClass('en-s3-title')
            $('.swiper-slide .content-title img').addClass('en-s3-img')
            $('.swiper-slide .box-content .content-txt').addClass('en-s3-txt')

            // 首页 下载 section4
            $('.download .box-2-title .down-app').addClass('en-s5-app')
            $('.download .box-2-title img').addClass('en-s5-img')
            $('.download .box-2-title .titile-2 span').addClass('en-s5-txt')


            // 资产管理页面,  操作那块的按钮样式和弹出框layer的样式，类名直接加在JS那生成的部分
            $('.assets-title img').addClass('en-as-img')
            $('.assets-title p').addClass('en-as-title')
            $('#totalsData .content-btn button').addClass('en-as-btn')


            //登录页面，登录的密码placeholder是再注册页面设置的
            $('#login-submit').val('Login');
            $("#account").attr('placeholder',"Please input account");

            //注册页面,placeholder主要在这修改
            $("#register").val("Gegister");
            $("#account1").attr('placeholder',"Please input account"); 
            $("#account0").attr('placeholder',"Please input email"); 
            $("#code").attr('placeholder',"please input code"); 
            $(".pwd #password").attr('placeholder',"Please input login password"); 
            $(".againPwd #passwordAgain").attr('placeholder',"Please input confirm password"); 
            $("#recommendCode").attr('placeholder',"Optional"); 
          


            // 首页导航下划线，长度定位调整

            mouseleaveFunc()


        });
    }


    var language = window.localStorage.language;
    if( !language ) {
        var currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
        if(!currentLang){//判断IE浏览器使用语言
            currentLang = navigator.browserLanguage;
        }
        language = currentLang.toLocaleLowerCase()
    } else {
        language = JSON.parse(language);
    }
    
    if (language.indexOf("cn") != -1) {
        cn()
    }
    if (language.indexOf("en") != -1) {
        en()
    }


})