var parsed = (document.location.href.split('#')[1] || '').split('|');
var params = parsed.reduce(function(params, param) {
    var param = param.split('=');
    params[param[0]] = decodeURIComponent(param.slice(1).join('='));
    return params;
}, {});


if (typeof params.targetUrl == "undefined") {
    params.targetUrl = "";
}
if (typeof params.clickTag == "undefined") {
    params.clickTag = "";
}


var form = {};

form.init = function() {
        //form.valid = false;
        form.values = {};
        form.values.issuevalue = 30000;
        form.values.interest = 0;
        form.values.hs = 0;
        form.values.protectionpackagefee = 0;
        //form.values.totalservicefee = 0;
        form.values.thm = 0;
        form.values.regularrate = 0;
        form.values.period = 42;
        form.values.frequency = "we";
        form.values.taptap = 0;
        form.values.finalrate = 0;

        form.values.ifhs = false;
        form.values.ifpp = false;

        form.testInit();
        form.displayAllFormElementsValue();

        $("#hs-chkbox0").click(form.hsChanged);
        $("#hs-chkbox").click(form.hsChanged);
        $("#ppf-chkbox").click(form.ppfChanged);

        sliderObject.plusClicked();
        sliderObject.plusClicked();
        sliderObject.minusClicked();
        sliderObject.minusClicked();

        //form.setHsOn();

    } //init
form.frequencyToString = function(v) {
        switch (v) {
            case "we":
                return "hét";
                break;

            case "mo":
                return "havi";
                break;

        }

    } //frequencyToString

form.frequency2ToString = function(v) {
        switch (v) {
            case "we":
                return "Heti";
                break;

            case "mo":
                return "Havi";
                break;

        }

    } //frequency2ToString


form.changed = function() {
        $("#display").removeClass("invalid");
        form.calculateValues();
        form.displayAllFormElementsValue();
    } //changed

form.setHsOn = function() {
        form.values.ifhs = true;
        $(".valuerow.hs-chkbox").addClass("checked");
        form.changed();
    } //setHsOn

form.hsChanged = function() {
        form.values.ifhs = false;
        if (!$(".valuerow.hs-chkbox").hasClass('checked')) {
            form.values.ifhs = true;
            $(".valuerow.hs-chkbox").addClass("checked");
        } else {
            $(".valuerow.hs-chkbox").removeClass("checked");
        }
        form.changed();
    } //hsChanged

form.ppfChanged = function() {
        form.values.ifpp = false;
        if (!$(".valuerow.ppf-chkbox").hasClass('checked')) {
            form.values.ifpp = true;
            $(".valuerow.ppf-chkbox").addClass("checked");
        } else {
            $(".valuerow.ppf-chkbox").removeClass("checked");
        }
        form.changed();
    } //ppfChanged



form.ChangedIssueValue = function(v) {
        form.values.issuevalue = v;
        form.changed();
    } //ChangedIssueValue

form.ChangedPeriod = function(v) {
        form.values.period = v;
        form.changed();
    } //ChangedPeriod

form.ChangedIfhs = function(v) {
        form.values.ifhs = v;
        form.changed();
    } //ChangedIfhs


form.ChangedIfpp = function(v) {
        form.values.ifpp = v;
        form.changed();
    } //ChangedIfpp



form.calculateValues = function() {
        form.values.thm = form.calculateTHM();
        form.values.frequency = form.calculateFrequency();
        form.values.hs = form.calculateHs();
        form.values.protectionpackagefee = form.calculatePp();







        form.values.interest = form.calculateInterest();
        form.values.taptap = form.calculateTapTap();
        form.values.regularrate = form.calculateRegularrate();
        form.values.finalrate = form.calculateFinalrate();
    } //calculateValues

form.calculateFinalrate = function() {
        return form.values.taptap - ((form.values.period - 1) * form.values.regularrate);
    } //calculateFinalrate


form.calculateTHM = function() {

        switch (form.values.period) {

            case 42:
                return "24.88";
                break;

            case 57:
                return "24.88";
                break;

            case 72:
                return "24.89";
                break;

            case 110:
                return "24.9";
                break;

            case 30:
                return "24.89";
                break;

        }

    } //calculateTHM


form.calculateHs = function() {
        if (form.values.ifhs != true) {
            return 0;
        }
        switch (form.values.period) {

            case 42:
                return form.values.issuevalue * 0.63;
                break;

            case 57:
                return form.values.issuevalue * 0.8667;
                break;

            case 72:
                return form.values.issuevalue * 0.9937;
                break;

            case 110:
                return form.values.issuevalue * 1.028;
                break;

            case 30:
                return form.values.issuevalue * 0.3899;
                break;

        }

    } //calculateHs

form.calculatePp = function() {
        if (form.values.ifpp != true) {
            return 0;
        }
        switch (form.values.period) {

            case 42:
                return form.values.issuevalue * 0.063;
                break;

            case 57:
                return form.values.issuevalue * 0.0855;
                break;

            case 72:
                return form.values.issuevalue * 0.108;
                break;

            case 110:
                return form.values.issuevalue * 0.165;
                break;

            case 30:
                return form.values.issuevalue * 0.09;
                break;

        }

    } //calculatePp


form.calculateInterest = function() {

        switch (form.values.period) {

            case 42:
                return form.values.issuevalue * 0.0945;
                break;

            case 57:
                return form.values.issuevalue * 0.1288
                break;

            case 72:
                return form.values.issuevalue * 0.1638;
                break;

            case 110:
                return form.values.issuevalue * 0.2555;
                break;

            case 30:
                return form.values.issuevalue * 0.3156;
                break;

        }

    } //calculateInterest


form.calculateTapTap = function() {
        //return form.values.regularrate * form.values.period;
        return form.values.issuevalue + form.values.interest + form.values.hs + form.values.protectionpackagefee;
    } //calculateTapTap

form.calculateRegularrate = function() {
        if (form.values.ifhs == true) {
            return form.round5(form.values.taptap / form.values.period);
        } else {
            return Math.ceil(form.values.taptap / form.values.period);
        }


    } //calculateRegularrate

form.calculateFrequency = function() {

        switch (form.values.period) {

            case 30:
                return "mo";
                break;

            default:
                return "we";
                break;

        }

    } //calculateFrequency

form.displaySetFormElementsValue = function(el, val) {
        $("#" + el + " .value").html(val);
    } //displaySetFormElementsValue

form.displaySetFormElementsValueDirect = function(el, val) {
        $("#" + el).html(val);
    } //displaySetFormElementsValueDirect

form.caluclateSubmitLink = function() {
        //https://www.providentonline.hu/?utm_period=30&utm_productType=MT&utm_issueValue=540000&utm_source=calculator&utm_medium=banner&utm_campaign=Pr%C3%B3baPartner
        //var submitlink = "https://www.providentonline.hu/";
        //var submitlink = "http://providentonline.hu/";
        //var submitlink=params.clickTag;
        var urlStart = "&";
        if (params.clickTag.indexOf( encodeURIComponent(encodeURIComponent("?")))== -1 ) {
            urlStart = "?"
        }
        var submitlink = "https://www.providentonline.hu/?utm_period=" + form.values.period;
        var producType = "MT";
        if (form.values.ifhs == true) {
            producType = "HS";
        }
        submitlink += "&utm_productType=" + producType;
        submitlink += "&utm_issueValue=" + form.values.issuevalue;
        var protectionpackage = "false";
        if (form.values.ifpp == true) {
            protectionpackage = "true";
        }
        if (form.values.ifpp == true) {
            submitlink += "&utm_protPackage=" + protectionpackage;
        }
          submitlink += "&utm_source=venezia&utm_medium=venezia_220x320&utm_campaign=pm_februar";
       /* if (params.clickTag.length>0) {
            submitlink = params.clickTag + encodeURIComponent(encodeURIComponent(submitlink));
           // submitlink = params.clickTag + submitlink;
        } else {
            //ez az ág azért kell hogy az interface-ben is lehessen tesztelni mert akkor még nics CT mérő
            // submitlink = params.clickTag + params.targetUrl + submitlink;
            submitlink = params.clickTag + submitlink;

        }
        */

        $("#submitlink").attr("href", submitlink);
        if (params.targetUrl != "") {
            $("#submitlink").attr("target", params.targetUrl);
        }
    } //caluclateSubmitLink

form.displayAllFormElementsValue = function() {
        form.displaySetFormElementsValue("issuevalue", calculator.formatValue(Math.round(form.values.issuevalue)));
        form.displaySetFormElementsValue("interest", calculator.formatValue(Math.round(form.values.interest)));
        form.displaySetFormElementsValue("hs", calculator.formatValue(Math.round(form.values.hs)));
        form.displaySetFormElementsValue("protectionpackagefee", calculator.formatValue(Math.round(form.values.protectionpackagefee)));
        //form.displaySetFormElementsValue("period", Math.round(form.values.period));
        //form.displaySetFormElementsValue("frequency", form.frequencyToString(form.values.frequency));
        form.displaySetFormElementsValueDirect("frequency2", form.frequency2ToString(form.values.frequency));
        //  form.displaySetFormElementsValue("regularrate", calculator.formatValue(Math.round(form.values.regularrate)));
        //   form.displaySetFormElementsValue("finalrate", calculator.formatValue(Math.round(form.values.finalrate)));

        form.displaySetFormElementsValue("regularrate", calculator.formatValue((form.values.regularrate)));
        form.displaySetFormElementsValue("finalrate", calculator.formatValue((form.values.finalrate)));


        form.displaySetFormElementsValue("thm", form.values.thm);
        form.displaySetFormElementsValue("taptap", calculator.formatValue(Math.round(form.values.taptap)));
        form.displaySetFormElementsValue("pedriodfrequency", calculator.formatValue(Math.round(form.values.period)) + " " + form.frequencyToString(form.values.frequency));

        form.checkForNullDisplay("hs", form.values.hs);
        form.checkForNullDisplay("protectionpackagefee", form.values.protectionpackagefee);

        form.caluclateSubmitLink();
    } //displayAllFormElementsValue

form.checkForNullDisplay = function(el, val) {
        if (val == 0) {
            $("#" + el).addClass("empty");
        } else {
            $("#" + el).removeClass("empty");
        }
    } //checkForNullDisplay


form.testInit = function() {
        //kalkulator.html#issuevalue=100000|ifhs=true|ifpp=false|testview=true
        for (var key in params) {
            if (params.hasOwnProperty(key) && form.values.hasOwnProperty(key)) {
                if (params[key] == "true" || params[key] == "false") {
                    if (params[key] == "true") {
                        params[key] = true;
                    } else {
                        params[key] = false;
                    }
                } else {
                    params[key] = Number(params[key]);
                }
                form.values[key] = params[key];
            }
        }

        if (params.hasOwnProperty("testview")) {
            $(".allcontainer").css("width", "auto");
            $("#container").css("width", "100%");
            $("#container.stage1 #stage2").css("opacity", 1);
        }

        if (params.hasOwnProperty("ifhs") && params.ifhs == true) {
            $(".hs-chkbox").addClass("checked");

        }

        if (params.hasOwnProperty("ifpp") && params.ifpp == true) {
            $(".ppf-chkbox").addClass("checked");
        }

        /*if (params.issuevalue) {
        	form.ChangedIssueValue(params.issuevalue)
        };
        */
        if (params.ifhs) {
            form.ChangedIfhs(params.ifhs)
        };
        if (params.ifpp) {
            form.ChangedIfpp(params.ifpp)
        };

    } //testInit

form.round5 = function(n) {
        // return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;

        if (n > 0) {
            return Math.ceil(n / 5.0) * 5;
        } else if (n < 0) {
            return Math.floor(n / 5.0) * 5;
        } else {
            return 5;
        }
    } //round5