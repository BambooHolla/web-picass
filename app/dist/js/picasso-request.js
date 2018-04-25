/**
 * 请求方法封装
 */
(function($) {

    // var host = document.location.protocol + "//192.168.16.101:40001";
    // var host = "http://192.168.16.101:40001";
    var host = "http://www.picaex.com"
    var prefix = "/api/v1/bngj";

    window.ServerHost = host;
    window.ServerPrefix = prefix;

    // headers:{"x-auth-token": sessionStorage.token}

    $.picassoGet = function(path, data, success, error) {
        path = path.toLowerCase();
        var url = path;
        if (path.indexOf('http://') < 0 && path.indexOf('https://') < 0) {
            url = host + prefix + path;
        }
        data.rnd = Date.now().toString();
        $.ajax({
            url: url,
            headers: {
                "x-auth-token": sessionStorage.token || '',
                "x-bnqkl-platform": "8545236f-0e18-4102-8705-fa5ee777b270"
            },
            method: "GET",
            data: data,
            contentType: "application/json",
            complete: function(xhr, ts) {
               
                handlerComplete(xhr, ts, success, error);
                
            }
        });
    }

    $.picassoPost = function(path, data, success, error) {
        path = path.toLowerCase();
        var url = path;
        if (path.indexOf('http://') < 0 && path.indexOf('https://') < 0) {
            url = host + prefix + path;
        }
        data.rnd = Date.now().toString();

        $.ajax({
            url: url,
            headers: {
                "x-auth-token": sessionStorage.token || '',
                "x-bnqkl-platform": "8545236f-0e18-4102-8705-fa5ee777b270"
            },
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            complete: function(xhr, ts) {
              
                handlerComplete(xhr, ts, success, error);

            }
        });

    }

    function handlerComplete(xhr, ts, _success, _error) {
        //if (xhr.status == 200) {

        var json = xhr.responseJSON;
        if (!json) {
            if (_error) {
                _error({ code: 999, message: xhr.statusText });
            } else {
                errorAlert(xhr.statusText)
            }

        } else if (json.fid) {
            //兼容文件服务
             _success(json)
        } else if (json.data) {
             _success(json.data)
        } else if (json.error) {
            if (json.error.code == -1) {
                console.log(json)
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("name");
                errorAlert("账户信息出错");
                setTimeout(function () {
                    window.top.location.href = "login.html";
                }, 2100);
            } else if (json.error.code == -2) {
                // errorAlert('当前充值和抢购的人数太多，请稍后再试');
                // } else if (json.error && json.error.code == -3) {
                //     errorAlert("请输入正确的验证码");
                //     $('.captcha').captcha();
            } else if (_error) {
                if (typeof(json.error) == "string") {
                    _error({ code: 999, message: json.error });
                } else {
                    _error(json.error);
                }
            } else {
                if (typeof(json.error) == "string") {
                    errorAlert("出现错误：" + json.error);
                } else if (json.error.message) {
                    errorAlert(json.error.message);
                } else {
                    errorAlert("出现错误：" + JSON.stringify(json.error));
                }
            }
        } else {
            errorAlert(JSON.stringify(json.error));
        }
        // } else {
        //     var e = xhr.status;

        // }
    }

    function errorAlert(text) {
        if (text == "error") {
            return;
        }
        // if (typeof($.i18nByCnText) == 'function') {
        //     text = $.i18nByCnText(text);
        // }
        if (window.top.layer && window.top.layer.msg) {
            window.top.layer.msg(text, {
                time: 2000
            });
        } else {
            alert(text);
        }
    }

    // $.fn.captcha = function(opt) {
    //     var $img = $(this);
    //     $img.bind('click');
    //     $img.bind('click', function() {
    //         getCaptcha();
    //     });
    //     getCaptcha();

    //     function getCaptcha() {
    //         $.icoGet('/captcha/getcaptcha', {}, function(data) {
    //             $img.attr('data-id', data.id);
    //             $img.data('id', data.id);
    //             $img.attr('src', 'data:image/png;base64,' + data.data);
    //         });
    //     }
    // }

})(jQuery);