$(function() {
    if (sessionStorage.token && sessionStorage.name) {
        $('.web-nav .login').html('<a data-href="index.html" style="font-size: 12px;" data-i18n="nav.outLogin">退出账户</a>');
        $('.moblie-nav').html('<a data-href="index.html" style="font-size: 12px;" data-i18n="nav.outLogin">退出账户</a>');

        $('.web-nav .login a,.moblie-nav a').click(function() {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            var href = $(this).attr("data-href");
            var txt = $('#slide_lang dt').text().trim()
            if (txt == "简体中文") {
                window.location.href = href + "#cn";
            } else if (txt == "English") {
                window.location.href = href + "#en";

            } else {
                window.location.href = href
            }
            window.location.reload()
            
        });



    } else {
        $('.web-nav .login').html('<a data-href="login.html" style="font-size: 12px;" data-i18n="nav.login">登录&nbsp;/&nbsp;注册</a>');
        $('.moblie-nav').html('<a data-href="login.html" style="font-size: 12px;"  data-i18n="nav.login">登录 / 注册</a>');
    }
})