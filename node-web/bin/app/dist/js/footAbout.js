$(function() {


    $('#foot-about').click(function() {
        layer.tips('<p>币加所是由PICASSO BLOCKCHAIN TECHNOLOGY (MALTA) LIMITED研发的数字资产交易平台。</p>', '#foot-about', {
            tips: [1, '#000'],
            time: 112000,
            skin: "tips-1"

        });
    })


    $('#foot-contact').click(function() {
        layer.tips('<p>如有相关意见或者建议请联系</br>官方服务邮箱：service@picaex.com</br>电话联系客服：15396228173</p>', '#foot-contact', {
            tips: [1, '#000'],
            time: 13000,
            skin: "tips-2",


        });
    })


    $('#foot-business').click(function() {
        layer.tips('<p>官方邮箱：service@picaex.com</br>客服电话：15396228173</p>', '#foot-business', {
            tips: [1, '#000'],
            time: 13000,
            skin: "tips-3"

        });
    })


})