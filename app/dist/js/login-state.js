$(function() {
    if (sessionStorage.token && sessionStorage.name) {
        $('.web-nav .login').html('<a href="javascript:;" style="font-size: 12px;" data-i18n="nav.outLogin">退出账户</a>');
        $('.web-nav .login a').click(function() {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            location.href = 'index.html';
        })
        $('.moblie-nav').html('<a href="javascript:;" style="font-size: 12px;" data-i18n="nav.outLogin">退出账户</a>');
        $('.moblie-nav a').click(function() {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('name');
            location.href = 'index.html';
        })

    } else {
        $('.web-nav .login').html('<a href="login.html" style="font-size: 12px;" data-i18n="nav.login">登录&nbsp;/&nbsp;注册</a>');
        $('.moblie-nav').html('<a href="login.html" style="font-size: 12px;"  data-i18n="nav.login">登录 / 注册</a>');
    }
})