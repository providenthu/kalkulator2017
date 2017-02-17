var $configBannerArray = [];
$configBannerArray[0] = [300, 250, "basic"];
$configBannerArray[1] = [300, 250, "intro"];
$configBannerArray[2] = [728, 90, "basic"];
$configBannerArray[3] = [728, 90, "intro"];
console.log($configBannerArray[2][1]);

/*
$( document ).ajaxError(function() {
  $( "#banner-code-container" ).text( "Triggered ajaxError handler." );
});
*/

$("#bannertype").change(function() {
    if ($("#utm_medium").val() == "") {
        var val = $(this).val();
        var newval = $configBannerArray[val][0] + "*" + $configBannerArray[val][1] + "-" + $configBannerArray[val][2];
        $("#utm_medium").val(newval);
    }

});


$("#hosturl").change(function() {

    checkForURLTheme($(this));
    // console.log($(this).val());
    try {
        $.ajax({
            url: $(this).val(),
            type: 'HEAD',
            error: function(data,status,xhr) {
                $("#hosturl").parent().addClass("has-error");
                console.log("hosturl doesn't exist");
            },
            success: function(data,status,xhr) {
                 $("#hosturl").parent().removeClass("has-error");
                console.log("hosturl ok");
            }
        });
    } catch (e) {
        console.log(e);
    }


});


function checkForURLTheme(i) {
    i.val(i.val());

}