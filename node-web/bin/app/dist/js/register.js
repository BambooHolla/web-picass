$(function() {
    /*
     *
     *  样式调整
     */


    // 滑动条下划线  start
    var navUnderline = document.querySelector('.nav ul');

    function mouseleaveFunc() {
        target.style.borderColor = 'transparent';
    }
    navUnderline.addEventListener("mouseleave", mouseleaveFunc);
    // 滑动条下划线  end
    // 邮箱注册
    $('.register-email').click(function() {
        registerType = 0;
        //注册类型下划线
        $('.register-phone  div').css('height', '0')
        $('.register-email  div').css('height', '31px')

        //注册输入框
        $('.tel').css('display', "none")
        $('.email').css('display', "block")
        $('.register-validate p').text('邮箱验证码')

        clearValue()

        //手机区号清空
        $('.tel .tel-content').text('')
    })

    // 国籍下拉框
    $('.nationality input').click(function(e) {
        var e = e || window.e;
        e.stopPropagation()
        $('.tel .select-select').css('display', 'none')
        $('.nationality .select-select').css('display', 'block')

        //下拉三角
        $('.nationality .select-logo').css('transform', 'rotate(180deg)')
        $('.tel .select-logo').css('transform', 'rotate(0deg)')

        $('.nationality .select-logo').css('-ms-transform', 'rotate(180deg)')
        $('.tel .select-logo').css('-ms-transform', 'rotate(0deg)')

        $('.nationality .select-logo').css('-moz-transform', 'rotate(180deg)')
        $('.tel .select-logo').css('-moz-transform', 'rotate(0deg)')

        $('.nationality .select-logo').css('-webkit-transform', 'rotate(180deg)')
        $('.tel .select-logo').css('-webkit-transform', 'rotate(0deg)')

        $('.nationality .select-logo').css('-o-transform', 'rotate(180deg)')
        $('.tel .select-logo').css('-o-transform', 'rotate(0deg)')
    })

    // 手机注册,区号下拉框
    $('.tel .tel-box').click(function(e) {
        var e = e || window.e;
        e.stopPropagation()
        $('.nationality .select-select').css('display', 'none')
        $('.tel .select-select').css('display', 'block')

        //下拉三角
        $('.tel .select-logo').css('transform', 'rotate(180deg)')
        $('.nationality .select-logo').css('transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-ms-transform', 'rotate(180deg)')
        $('.nationality .select-logo').css('-ms-transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-moz-transform', 'rotate(180deg)')
        $('.nationality .select-logo').css('-moz-transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-webkit-transform', 'rotate(180deg)')
        $('.nationality .select-logo').css('-webkit-transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-o-transform', 'rotate(180deg)')
        $('.nationality .select-logo').css('-o-transform', 'rotate(0deg)')
    })

    //点击任意,隐藏下拉框
    $(document).click(function() {
        $('.nationality .select-select').css('display', 'none')
        $('.tel .select-select').css('display', 'none')

        //下拉三角
        $('.select-logo').css('transform', 'rotate(0deg)')
        $('.select-logo').css('-ms-transform', 'rotate(0deg)')
        $('.select-logo').css('-moz-transform', 'rotate(0deg)')
        $('.select-logo').css('-webkit-transform', 'rotate(0deg)')
        $('.select-logo').css('-o-transform', 'rotate(0deg)')
    })

    // 下拉框点击选择赋值
    $('.nationality .select-select').click(function(e) {
        var e = e || window.e;
        var obj = e.target || e.srcElement;
        e.stopPropagation()
        $('.nationality input').val(obj.innerText)
        $('.nationality .select-select').css('display', 'none')

        //下拉三角
        $('.nationality .select-logo').css('transform', 'rotate(0deg)')
        $('.nationality .select-logo').css('-ms-transform', 'rotate(0deg)')
        $('.nationality .select-logo').css('-moz-transform', 'rotate(0deg)')
        $('.nationality .select-logo').css('-webkit-transform', 'rotate(0deg)')
        $('.nationality .select-logo').css('-o-transform', 'rotate(0deg)')
    });

    $('.tel .select-select').click(function(e) {
        var e = e || window.e;
        var obj = e.target || e.srcElement;
        e.stopPropagation()
        $('.tel .tel-content').text(obj.innerText)
        $('.tel .select-select').css('display', 'none')

        //下拉三角
        $('.tel .select-logo').css('transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-ms-transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-moz-transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-webkit-transform', 'rotate(0deg)')
        $('.tel .select-logo').css('-o-transform', 'rotate(0deg)')
    })



    /*
     *
     *  注册事件
     */


    //注册类型,0邮箱,1手机 ,默认进来为手机
    var registerType = 1;

    // 检测账号是否被占用,获取验证码
    function accountOccupy() {
        var account = $('#account' + registerType).val();
        var dataOccupy = registerType ? `telephone=${account}` : `email=${account}`;

        var url = "/user"
        var valiData = {}
            // if (registerType == 0) {
            //     layer.msg("验证码发送失败，请稍后再试");
            //     return;
            // }

        // 开始倒计时,发送验证码请求
        $('.validate-btn').css('cursor', 'not-allowed')
        $('.validate-btn').off('click', validateClick)
        $.picassoGet("/user/checkRegAccount", dataOccupy, function(data) {
            console.log(data);

            if (data.status == 'ok') {
                layer.msg(data.message, {
                    time: 1500
                });

                $('#account' + registerType).val('')
                return;
            }


            if (registerType) {
                url += "/sendSmsToAppointed"
                valiData = {
                    telephone: account,
                    type: "1001"
                }
            } else {
                url += "/sendEmailCode"
                valiData = {
                    email: account,
                    type: "201"
                }
            }
            $.picassoGet(url, valiData, function(data) {
                console.log(data)


                validateTime()
            }, function(err) {
                $('.validate-btn').text('获取验证码');
                $('.validate-btn').on('click', validateClick)
                $('.validate-btn').css('cursor', 'pointer')
                console.log(err);
                layer.msg("请求出错");
            })

        }, function(err) {
            console.log(err);
            $('.validate-btn').text('获取验证码');
            $('.validate-btn').on('click', validateClick)
            $('.validate-btn').css('cursor', 'pointer')
            layer.msg("验证码发送失败，请稍后再试");
        });

    }


    // 点击验证码，切换样式
    var countDown = 60;
    var validateSetTimeout;
    // 倒计时
    function validateTime() {
        $('.validate-btn').text(countDown + '秒');

        validateSetTimeout = setTimeout(function() {
            countDown--;
            if (countDown > 0) { validateTime() } else {
                $('.validate-btn').text('获取验证码');
                $('.validate-btn').on('click', validateClick)
                $('.validate-btn').css('cursor', 'pointer')
            }
        }, 1000);
    }

    //先判断是否填写账号，发送验证码请求，之后倒计时
    function validateClick() {
        countDown = 60;

        //验证账号
        var account = $('#account' + registerType).val().trim();

        if (registerType) {
            if (!account) {
                layer.msg('请输入手机号', {
                    time: 1500
                });
                return;
            }
            if (!validator.isMobilePhone(account, 'zh-CN')) {
                layer.msg('手机号输入错误', {
                    time: 1500
                });
                return;
            }
        } else {
            if (!account) {
                layer.msg('请输入邮箱', {
                    time: 1500
                });
                return;
            }
            if (!validator.isEmail(account)) {
                layer.msg('邮箱输入错误', {
                    time: 1500
                });
                return;
            }
        }

        //验证格式通过，判断是否账号存在
        accountOccupy()
    }
    //监听事件
    $('.validate-btn').on('click', validateClick)



    // 切换注册类型

    // 切换状态,原来的类型表单内容清空
    function clearValue() {
        $(':input', '#myform')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');


        clearTimeout(validateSetTimeout);

        $('.validate-btn').text('获取验证码');
        $('.validate-btn').off('click', validateClick)
        $('.validate-btn').on('click', validateClick)
        $('.validate-btn').css('cursor', 'pointer')

    }
    // 手机注册
    $('.register-phone').click(function() {
        registerType = 1;
        //注册类型下划线
        $('.register-email div').css('height', '0')
        $('.register-phone  div').css('height', '31px')

        //注册输入框
        $('.tel').css('display', "block")
        $('.email').css('display', "none")
        $('.register-validate p').text('短信验证码')

        clearValue()
    });




    //注册事件
    $('input[type="submit"]').click(function(e) {
        var e = e || window.e
        e.preventDefault()
        var userProtocol = $('#userProtocol').is(':checked');
        var account = $('#account' + registerType).val().trim();
        var password = $('#password').val();
        var passwordAgain = $('#passwordAgain').val();
        var code = $('#code').val().trim();
        var type = validator.isEmail(account) ? 0 : 1;
        var recommendCode = $('#recommendCode').val().trim();
        var data = registerType ? `telephone=${account}` : `email=${account}`;
        // 注册传参变量
        var parameter = {};

        if (registerType) {
            if (!account) {
                layer.msg('请输入手机号', {
                    time: 1500
                });
                return;
            }
            if (!validator.isMobilePhone(account, 'zh-CN')) {
                layer.msg('手机号输入错误', {
                    time: 1500
                });
                return;
            }
        } else {
            if (!account) {
                layer.msg('请输入邮箱', {
                    time: 1500
                });
                return;
            }
            if (!validator.isEmail(account)) {
                layer.msg('邮箱输入错误', {
                    time: 1500
                });
                return;
            }
        }
        if (!password) {
            layer.msg('请输入登录密码', {
                time: 1500
            });
            return;
        }
        if (!validator.isByteLength(password, {
                min: 6,
                max: 20
            })) {
            layer.msg('登录密码长度须在6~20位之间', {
                time: 1500
            });
            return;
        }
        if (!passwordAgain) {
            layer.msg('请输入确认密码', {
                time: 1500
            });
            return;
        }
        if (!validator.isByteLength(passwordAgain, {
                min: 6,
                max: 20
            })) {
            layer.msg('确认密码长度须在6~20位之间', {
                time: 1500
            });
            return;
        }
        if (password != passwordAgain) {
            layer.msg('密码输入不一致', {
                time: 1500
            });
            return;
        }
        if (!code) {
            layer.msg('请输入验证码', {
                time: 1500
            });
            return;
        }
        if (!userProtocol) {
            layer.msg('您未同意用户协议', {
                time: 1500
            });
            return;
        }
        //判断是否账号存在
        $.picassoGet("/user/checkRegAccount", data, function(data) {
            console.log(data);

            if (data.status == 'ok') {
                layer.msg(data.message, {
                    time: 1500
                });
                return;
            }

            parameter = {
                type: type,
                account: account,
                password: password,
                code: code
            }
            if (recommendCode.length > 0 && recommendCode.length <= 40 && (/^[0-9a-zA-Z\-]*$/g).test(recommendCode)) {
                parameter.recommendCode = recommendCode;
            }

            // 注册请求

            $.picassoPost("/user/authRegister", parameter, function(data) {
                console.log(data);
                sessionStorage.token = data.token;
                sessionStorage.name = data.name;

                layer.msg('注册成功');

                var txt = $('#slide_lang dt').text().trim()
                var href = "index.html"

                if (txt == "简体中文") {
                    href += '?cn&ref='
                } else if (txt == "English") {
                    href += '?en&ref='

                } else {
                    href += '?cn&ref='
                }
                setTimeout(function() {
                    location.href = href + recommendCode ? recommendCode : '';
                }, 1000);

            }, function(err) {
                console.log(err);
                layer.msg(err.message);
            })

        }, function(err) {
            console.log(err);
            layer.msg(err.message);
        });


    })

})