String.prototype.insert = function(index, string) {
	if (index > 0)
		return this.substring(0, index) + string + this.substring(index, this.length);
	else
		return string + this;
};





var calculator = {};

var sliderObject = {};
var periodObject = {};
var navigationObject = {};

calculator.sliderObject = sliderObject;
calculator.periodObject = periodObject;
calculator.navigationObject = navigationObject;

calculator.init = function() {
		calculator.sliderObject.init();
		calculator.periodObject.init();
		calculator.navigationObject.init();
	} //init


/*SLIDER*/
sliderObject.init = function() {
		sliderObject.issueValue = 0;
		sliderObject.sliderMinVal = 30000;
		sliderObject.sliderMaxVal = 1000000;
		sliderObject.sliderValSpan = 10000;
		sliderObject.sliderValNoMin = 440000;
		sliderObject.sliderValNoMax = 500000;
		sliderObject.$sliderEl = $("#slider-issuevalue");
		sliderObject.$sliderTextEl = $("#issuevaluetext");
		sliderObject.$plusEl = $("#plusminus .plus");
		sliderObject.$minusEl = $("#plusminus .minus");
		sliderObject.$sliderEl.mbSlider({
			minVal: sliderObject.sliderMinVal,
			maxVal: sliderObject.sliderMaxVal,
			grid: sliderObject.sliderValSpan,
			showVal: false,
			onSlide: sliderObject.onSlide,
			onSlideUp: sliderObject.onSlideUp,
			onSlideLoad: sliderObject.onSlideLoad
		});
		sliderObject.$sliderTextEl.text(sliderObject.sliderMinVal);
		$(".mb_sliderValueLabel", sliderObject.$sliderEl).hide();
		sliderObject.$plusEl.on("click", sliderObject.plusClicked);
		sliderObject.$minusEl.on("click", sliderObject.minusClicked);
		if (params.issuevalue) {
			sliderObject.issueValue = params.issuevalue;
			sliderObject.$sliderEl.mbsetVal(sliderObject.issueValue);
			sliderObject.$sliderTextEl.text(calculator.formatValue(sliderObject.issueValue));

		};

	} //initSlider


sliderObject.onSlideLoad = function(s) {
		return;
		var width=$(s).width();
		var handlerwidth=$(".mb_sliderHandler", s).width();
		var r=  width/sliderObject.sliderMaxVal;
		var start=sliderObject.sliderValNoMin*r;
		start-=handlerwidth*(start/width);
		var end=(sliderObject.sliderValNoMax)*r;
		end-=handlerwidth*(end/width);
		var w=end-start;
		$(".mb_sliderRange", s).append('<div id="deadzone"></div>');
		$("#deadzone").css("width", w);
		$("#deadzone").css("margin-left", start);

	} //onSlideLoad



sliderObject.plusClicked = function() {
		var v = sliderObject.$sliderEl.mbgetVal();
		if (v == sliderObject.sliderMaxVal) {
			return;
		}
		var currentval = v + sliderObject.sliderValSpan;
		v = sliderObject.interVallSlideValuePlusMinus(currentval);
		if (v != currentval) {
			currentval = v;
		}

		sliderObject.$sliderEl.mbsetVal(currentval);
		sliderObject.$sliderTextEl.text(calculator.formatValue(currentval));
		sliderObject.issueValue = currentval;
		form.ChangedIssueValue(currentval);
		periodObject.displayIssuePeriods(currentval);

	} //plusClicked
sliderObject.minusClicked = function() {
		var v = sliderObject.$sliderEl.mbgetVal()
		if (v == sliderObject.sliderMinVal) {
			return;
		}
		var currentval = v - sliderObject.sliderValSpan;
		v = sliderObject.interVallSlideValuePlusMinus(currentval);
		if (v != currentval) {
			currentval = v;
		}
		sliderObject.$sliderEl.mbsetVal(currentval);
		sliderObject.$sliderTextEl.text(calculator.formatValue(currentval));
		sliderObject.issueValue = currentval;
		form.ChangedIssueValue(currentval);
		periodObject.displayIssuePeriods(currentval);
	} //minusClicked
sliderObject.onSlide = function(o) {
		var currentval = $(o).mbgetVal();
		var currentval0 = currentval;
		var c = sliderObject.interVallSlideValue(currentval);
		if (c != currentval) {
			currentval = c;
			//$(o).mbsetVal(currentval);
		}
		sliderObject.$sliderTextEl.text(calculator.formatValue(currentval0));
		sliderObject.issueValue = currentval;
		form.ChangedIssueValue(currentval);
		periodObject.displayIssuePeriods(currentval);
	} //onSlide

sliderObject.onSlideUp = function(o) {

		var currentval = $(o).mbgetVal();
		var c = sliderObject.interVallSlideValue(currentval);
		if (c != currentval) {
			currentval = c;
			$(o).mbsetVal(currentval);
		}
		sliderObject.$sliderTextEl.text(calculator.formatValue(currentval));
		sliderObject.issueValue = currentval;
		form.ChangedIssueValue(currentval);
		periodObject.displayIssuePeriods(currentval);
	} //onSlideUp

sliderObject.interVallSlideValuePlusMinus = function(val) {
		var ret = val;
		
		if ((sliderObject.issueValue <= val) && (sliderObject.sliderValNoMin <= val && val <= sliderObject.sliderValNoMax)) {
			ret = sliderObject.sliderValNoMax;
		}

		if ((sliderObject.issueValue > val) && (sliderObject.sliderValNoMin <= val && val <= sliderObject.sliderValNoMax)) {
			ret = sliderObject.sliderValNoMin;
		}

		return ret;
	} //interVallSlideValuePlusMinus

sliderObject.interVallSlideValue = function(val) {
		var ret = val;

		var middle = sliderObject.sliderValNoMin + (sliderObject.sliderValNoMax - sliderObject.sliderValNoMin) * 0.5;
		if ((middle <= val) && (sliderObject.sliderValNoMin <= val && val <= sliderObject.sliderValNoMax)) {
			ret = sliderObject.sliderValNoMax;
		}

		if ((middle > val) && (sliderObject.sliderValNoMin <= val && val <= sliderObject.sliderValNoMax)) {
			ret = sliderObject.sliderValNoMin;
		}


		return ret;
	} //interVallSlideValue

calculator.formatValue = function(v) {
		val = "";

		if (v < 1000) {
			val = v.toString();
		}

		if (v > 1000 && v < 10000) {
			val = v.toString().insert(1, " ");
		}
		if (v > 10000 && v < 100000) {
			val = v.toString().insert(2, " ");
		}
		if ((v >= 100000) && (v < 1000000)) {
			val = v.toString().insert(3, " ");
		}
		if ((v >= 1000000)) {
			val = v.toString().insert(1, " ");
			val = val.toString().insert(5, " ");
		}
		return val;
	} //formatValue



/*PERIOD*/
periodObject.allowPeriodsArray = [0];
periodObject.init = function() {
		periodObject.displayIssuePeriods(30000);
		$(".period-radio").click(periodObject.periodChanged);

	} //init

periodObject.periodChanged = function(e) {
		e.stopPropagation();
		if ($(this).parent().hasClass("disabled")) {
			return false;
		}
		periodObject.changePeriod(Number($(this).attr("data-value")));
		return false;
	} //periodChanged


periodObject.changePeriod = function(p) {
		$(".oneperiod").removeClass("choosen");
		$(".oneperiod." + p).addClass("choosen");
		form.ChangedPeriod(p);
	} //changePeriod



periodObject.displayIssuePeriods = function(iv) {
		if (30000 <= iv && iv <= 150000) {
			periodObject.allowPeriods([42, 57, 72]);
		}

		if (160000 <= iv && iv <= 190000) {
			periodObject.allowPeriods([57, 72]);
		}


		if (200000 <= iv && iv <= 280000) {
			periodObject.allowPeriods([57, 72, 110]);
		}


		if (290000 <= iv && iv <= 350000) {
			periodObject.allowPeriods([72, 110]);
		}
		if (360000 <= iv && iv <= 440000) {
			periodObject.allowPeriods([110]);
		}

		if (450000 <= iv && iv <= 490000) {
			periodObject.allowPeriods([0]);
		}

		if (500000 <= iv && iv <= 1000000) {
			periodObject.allowPeriods([30]);
		}


	} //displayIssuePeriods

periodObject.allowPeriods = function(a) {

		if (periodObject.allowPeriodsArray == a) {
			return;
		}
		periodObject.allowPeriodsArray = a;
		var al = a.length;
		$(".oneperiod").addClass("disabled");
		//$(".oneperiod input").attr("disabled", true);
		for (var i = 0; i < al; i++) {
			$(".oneperiod." + a[i]).removeClass("disabled");
			//$(".oneperiod." + a[i] + " input").removeAttr("disabled");
		}
		if (form.values) {
			var newp = periodObject.allowPeriodsArray[0];
			form.ChangedPeriod(newp);
			periodObject.changePeriod(newp);
		}
		if(periodObject.allowPeriodsArray.length>1){ $("#periodtitle").addClass("more")}else{$("#periodtitle").removeClass("more")}

	} //allowPeriods

/*RESULT*/

navigationObject.init = function() {
		navigationObject.$lt=$("#lt");
		navigationObject.$container = $("#container");
		navigationObject.$calcbutton = $("#calculatebutton");
		navigationObject.$reissuebutton = $("#reissuebutton");
		navigationObject.$container.addClass("stage1");
		navigationObject.$lt.addClass("stage1");
		navigationObject.$calcbutton.click(navigationObject.calcbuttonClick);
		navigationObject.$reissuebutton.click(navigationObject.reissuebuttonClick);

	} //init

navigationObject.calcbuttonClick = function(e) {
		e.stopPropagation();
		navigationObject.$container.removeClass("stage1");
		navigationObject.$container.addClass("stage2");
		navigationObject.$lt.removeClass("stage1");
		navigationObject.$lt.addClass("stage2");
		return false;

	} //calcbuttonClick

navigationObject.reissuebuttonClick = function(e) {
		e.stopPropagation();
		navigationObject.$container.removeClass("stage2");
		navigationObject.$container.addClass("stage1");
		navigationObject.$lt.removeClass("stage2");
		navigationObject.$lt.addClass("stage1");
		return false;

	} //reissuebuttonClick


$(document).ready(function() {
	calculator.init();
	form.init();
});