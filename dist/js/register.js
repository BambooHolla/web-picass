$(function() {
    /*
     *
     *  样式调整 ，下拉三角需求改变，已把对应的DOM隐藏
     */


    // 滑动条下划线  start
    var navUnderline = document.querySelector('.nav ul');

    function mouseleaveFunc() {
        target.style.borderColor = 'transparent';
    }
    navUnderline.addEventListener("mouseleave", mouseleaveFunc);
    // 滑动条下划线  end
    

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
    //账号是否存在
    var accountExist = true;
    var accountExistText = $('.account-exist');

     // 切换注册类型,原来的类型表单内容清空
     function clearValue() {
        $(':input', '#myform')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');


        clearTimeout(validateSetTimeout);

        var lj = window.location.hash;
       
        if(lj == "#en"){

            $('.validate-btn').text('Get code');
        }else{
            $('.validate-btn').text('获取验证码');
        }
        
        $('.validate-btn').off('click', validateClick)
        $('.validate-btn').on('click', validateClick)
        $('.validate-btn').css('cursor', 'pointer')

    }

    //账号存在检测
    $('#account0,#account1').blur(function(){
        var account = $('#account' + registerType).val().trim();
        var data = registerType ? "telephone=" + account : "email=" + account;
        var lj = window.location.hash;
        var text = "";
      
        accountExistText.css('display','block');
        if (registerType) {
            if (!account) {
                if(lj == "#en"){
                    text = "Please input phone number";
                }else{
                    text = "请输入手机号";
                }
                accountExistText.text('请输入手机号');
                return;
            }
            if (!validator.isMobilePhone(account, 'zh-CN')) { 
                if(lj == "#en"){
                    text = "Wrong phone number";
                }else{
                    text = "手机号输入错误";
                }
                accountExistText.text(text);
                return;
            }
        } else {
            if (!account) {
                if(lj == "#en"){
                    text = "Please input email";
                }else{
                    text = "请输入邮箱";
                }
                accountExistText.text(text);
                return;
            }
            if (!validator.isEmail(account)) {
                if(lj == "#en"){
                    text = "Wrong email";
                }else{
                    text = "邮箱输入错误";
                }
                accountExistText.text(text);
                return;
            }
        }
        accountExistText.css('display','none');


        $.picassoGet("/user/checkRegAccount", data, function(data) {
            var lj = window.location.hash;
            //账号已注册
            if (data.status == 'ok') {
                accountExist = true;
                accountExistText.css('display','block');
                if(lj == "#en"){
                    accountExistText.text('The account has been registered');
                }else{
                    accountExistText.text('账号已被注册');
                }
               
                return;
            }
            accountExist = false;

        }, function(err) {
            console.log(err);
            layer.msg(err.message);
        });
    })


    // 邮箱注册
    $('.register-email').click(function() {
        registerType = 0;
        //注册类型下划线
        $('.register-phone  div').css('height', '0');
        $('.register-email  div').css('height', '31px');

        //注册输入框
        $('.tel').css('display', "none");
        $('.email').css('display', "block");
        

        clearValue();

        //手机区号清空
        $('.tel .tel-content').text('');

        //初始化校验
        accountExistText.css('display','none');
        $('.pwd-box .validate-pwd').css('display', "none");
    });

    // 手机注册
    $('.register-phone').click(function() {
        registerType = 1;
        //注册类型下划线
        $('.register-email div').css('height', '0')
        $('.register-phone  div').css('height', '31px')

        //注册输入框
        $('.tel').css('display', "block")
        $('.email').css('display', "none")
       

        clearValue();
         //初始化校验
         accountExistText.css('display','none');
         $('.pwd-box .validate-pwd').css('display', "none");
    });


    // 检测账号是否被占用,获取验证码
    function accountOccupy() {
        var account = $('#account' + registerType).val();
        var dataOccupy = registerType ? "telephone=" + account : "email=" + account;
      
        var url = "/user"
        var valiData = {}

        $.picassoGet("/user/checkRegAccount", dataOccupy, function(data) {
            var lj = window.location.hash;
            if (data.status == 'ok') {
                if(lj == "#en"){
                    $('.validate-btn').text('Get code');
                }else{
                    $('.validate-btn').text('获取验证码');
                }
                $('.validate-btn').on('click', validateClick)
                $('.validate-btn').css('cursor', 'pointer')
                layer.msg("账号已被注册");
                return ; 
            }

            // 开始倒计时,发送验证码请求
        $('.validate-btn').css('cursor', 'not-allowed');
        $('.validate-btn').off('click', validateClick);
        
     
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
            validateTime();
            console.log(err);
            var lj = window.location.hash;
            if(lj == "#en"){
                layer.msg("Fail to send verificaiton code");
            }else{
                layer.msg("验证码发送失败");
            }
           
        })

        }, function(err) {
            console.log(err);
            layer.msg(err.message);
        });

    }


    // 点击验证码，切换样式
    var countDown = 60;
    var validateSetTimeout;
    // 倒计时
    function validateTime() {
        $('.validate-btn').text(countDown + 's');

        validateSetTimeout = setTimeout(function() {
            countDown--;
            if (countDown > 0) {
                 validateTime();
            } else {
                var lj = window.location.hash;
                if(lj == "#en"){
                    $('.validate-btn').text('Get code');
                }else{
                    $('.validate-btn').text('获取验证码');
                }
                $('.validate-btn').on('click', validateClick)
                $('.validate-btn').css('cursor', 'pointer')
            }
        }, 1000);
    }

    //先判断是否填写账号，发送验证码请求，之后倒计时
    function validateClick() {
        var lj = window.location.hash;
        var text = '';
        countDown = 60;
       
        //验证账号
        var account = $('#account' + registerType).val().trim();

        if (registerType) {
            if (!account) {
                if(lj == "#en"){
                    text = 'Please input phone number';
                }else{
                    text = '请输入手机号';
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
            if (!validator.isMobilePhone(account, 'zh-CN')) {
                if(lj == "#en"){
                    text = 'Wrong phone number';
                }else{
                    text = '手机号输入错误';
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
        } else {
            if (!account) {
                if(lj == "#en"){
                    text = 'Please input email';
                }else{
                    text = '请输入邮箱';
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
            if (!validator.isEmail(account)) {
                if(lj == "#en"){
                    text = 'Wrong email';
                }else{
                    text = '邮箱输入错误';
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
        }

        //验证格式通过，判断是否账号存在
        accountOccupy()
    }
    //监听事件
    $('.validate-btn').on('click', validateClick);


    //密码校验提示
    $('#password,#passwordAgain').blur(function(){
        var password = $('#password').val();
        var passwordAgain = $('#passwordAgain').val();
        var lj = window.location.hash;
        var text = "";
        
        if(password.length > 0 && !(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/.test(password))){
            if(lj == "#en"){
                text = "Password must include capital letter, lowercase and number";
            }else{
                text = "密码需包含大写字母，小写字母和数字";
            }
            $('.pwd-box .password').text(text);
            $('.pwd-box .password').css('display',"block");
        }else if(password.length > 20){
            if(lj == "#en"){
                text = "Password length 20 characters at most";
            }else{
                text = "密码长度最多20位";
            }
            $('.pwd-box .password').text(text);
            $('.pwd-box .password').css('display',"block");
            
        }else{
           
            $('.pwd-box .password').css('display',"none");
        }
        if(passwordAgain.length > 0 && !(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/.test(passwordAgain))){
            if(lj == "#en"){
                text = "Password must include capital letter, lowercase and number";
            }else{
                text = "密码需包含大写字母，小写字母和数字";
            }
            $('.pwd-box .passwordAgain').text(text);
            $('.pwd-box .passwordAgain').css('display',"block");
        }else if( passwordAgain.length > 20){
            if(lj == "#en"){
                text = "Password length 20 characters at most";
            }else{
                text = "密码长度最多20位";
            }
            $('.pwd-box .passwordAgain').text(text);
            $('.pwd-box .passwordAgain').css('display',"block");
        }else{
            $('.pwd-box .passwordAgain').css('display',"none");
        }
        if( (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/.test(password)) && password.length > 0) 
            || (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/.test(passwordAgain)) && passwordAgain.length > 0)
            || password.length > 20 || passwordAgain.length > 20)
        {
            return;
        }

        if(password && passwordAgain){
            if(lj == "#en"){
                text = "Two passwords are not identical"
            }else{
                text = "两次密码不一致";
            }
            $('.pwd-box .validate-pwd').text(text);
            $('.pwd-box .validate-pwd').css('display',password == passwordAgain ? "none":"block");
        } else {
            $('.pwd-box .validate-pwd').css('display', "none");
        }

    });

    
    if(JSON.parse(sessionStorage.ref?sessionStorage.ref:"false")){
        $('#recommendCode').val(JSON.parse(sessionStorage.ref));
    }

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
        var data = registerType ? "telephone=" + account : "email=" + account;
        // 注册传参变量
        var parameter = {};
       
        var lj = window.location.hash;
        var text = "";
        if (registerType) {
            if (!account) {
                if(lj == "#en"){
                    text = "Please input phone number"
                }else{
                    text = "请输入手机号";
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
            if (!validator.isMobilePhone(account, 'zh-CN')) {
                if(lj == "#en"){
                    text = "Wrong phone number"
                }else{
                    text = "手机号输入错误";
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
        } else {
            if (!account) {
                if(lj == "#en"){
                    text = "Please input email"
                }else{
                    text = "请输入邮箱";
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
            if (!validator.isEmail(account)) {
                if(lj == "#en"){
                    text = "Wrong email"
                }else{
                    text = "邮箱输入错误";
                }
                layer.msg(text, {
                    time: 1500
                });
                return;
            }
        }
         //判断是否账号存在
         if(accountExist){
            if(lj == "#en"){
                text = "The account has been registered"
            }else{
                text = "账号已被注册";
            }
            layer.msg(text);
            return ; 
        }
        if (!code) {
            if(lj == "#en"){
                text = "Please input verification code"
            }else{
                text = "请输入验证码";
            }
            layer.msg(text, {
                time: 1500
            });
            return;
        }
        if (!password) {
            if(lj == "#en"){
                text = "Please input login password"
            }else{
                text = "请输入登录密码";
            }
            layer.msg(text, {
                time: 1500
            });
            return;
        }
        if (!passwordAgain) {
            if(lj == "#en"){
                text = "Please input confirm password"
            }else{
                text = "请输入确认密码";
            }
            layer.msg(text, {
                time: 1500
            });
            return;
        }
        if(password.indexOf(' ') > 0){
            if(lj == "#en"){
                text = "No space in login password"
            }else{
                text = "登录密码不能包含空格";
            }
            layer.msg(text, {
                time: 1500
            });
            return;
        }
        if(passwordAgain.indexOf(' ') > 0){
            if(lj == "#en"){
                text = "Confirm no space in login password"
            }else{
                text = "确认密码不能包含空格";
            }
            layer.msg(text, {
                time: 1500
            });
            return;
        }
        if (password != passwordAgain) {
            if(lj == "#en"){
                text = "Passwords are not identical"
            }else{
                text = "密码输入不一致";
            }
            layer.msg(text, {
                time: 1500
            });
            return;
        }
       
        if (!userProtocol) {
            if(lj == "#en"){
                text = "you haven't agreed with \"user agreement\""
            }else{
                text = "您未同意用户协议";
            }
            layer.msg(text, {
                time: 1500
            });
            return;
        }
       
        
        parameter = {
            type: type,
            account: account,
            password: md5(password),
            code: code,
            deviceNum: '',
            deviceInfo:{
                "uuid":"",
                "model":"",
                "platform":"",
                "version":"",
                "manufacturer":"",
                "serial":""
              },
            deviceType: '',
            operateSystem: '',
            ip: "192.168.0.1",
            location :  {
                latitude : "",
                longitude : ""
            },
        }
        if (recommendCode.length > 0 && recommendCode.length <= 40 && (/^[0-9a-zA-Z\-]*$/g).test(recommendCode)) {
            parameter.recommendCode = recommendCode;
            localStorage.recommendCode = recommendCode;
        }
        // 注册请求

        $.picassoPost("/user/authRegister", parameter, function(data) {
            console.log(data);
            sessionStorage.token = JSON.stringify(data.token);
            sessionStorage.name = JSON.stringify(data.name);
            var lj = window.location.hash;
            var text = "";
            if(lj == "#en"){
                text = "Register successfully"
            }else{
                text = "注册成功";
            }
            layer.msg(text);

            var txt = $('#slide_lang dt').text().trim()
            var href = "management.html"
            setTimeout(function() {
                location.href = href + (recommendCode ? ("?ref=" + recommendCode) : '');
    
            }, 1000);

        }, function(err) {
            console.log(err);
            layer.msg(err.message);
        })
    })

})