$(function() {
    $('#register').click(function(e) {
        var e = e || window.e
        e.preventDefault()
        var recommendCode = $('#recommendCode').val().trim();
        if (recommendCode.length > 0 && recommendCode.length <= 40 && (/^[0-9a-zA-Z\-]*$/g).test(recommendCode)) {
            localStorage.recommendCode = recommendCode
        }
    })
})