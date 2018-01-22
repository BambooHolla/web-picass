$(function() {
    if (sessionStorage.token && sessionStorage.name) {
        $('.web-nav .login').html('<a data-href="javascript:;" style="font-size: 12px;" data-i18n="nav.outLogin">退出账户</a>');
        $('.moblie-nav').html('<a href="javascript:;" style="font-size: 12px;" data-i18n="nav.outLogin">退出账户</a>');



        $('.web-nav .login a,.moblie-nav a').click(function() {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            var txt = $('#slide_lang dt').text();
            if (txt == "简体中文") {

                window.location.href = "index.html#cn";
            } else {
                window.location.href = "index.html#en";
            }

        })



    } else {
        $('.web-nav .login').html('<a data-href="login.html" style="font-size: 12px;" data-i18n="nav.login">登录&nbsp;/&nbsp;注册</a>');
        $('.moblie-nav').html('<a data-href="login.html" style="font-size: 12px;"  data-i18n="nav.login">登录 / 注册</a>');
    }
})