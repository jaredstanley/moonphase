$(document).ready(function(){


var moonLabelsArr = ["Full Moon",
				"Waning Gibbous",
				"Third Quarter",
				"Waning Crescent",
				"New Moon",
				"Waxing Crescent",
				"First Quarter",
				"Waxing Gibbous"
				];
var origDate = new Date(2012, 7, 31);
var synodicMonth = 29.530588853;
var pct; //float btwn 0-1;
var totalFrames = 29;
var date = new Date(); //gets current date for first time
var month;
var day;
var dayOfWeek; 
var year;

var dowArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var calIsVisible = false;



addEventListener("touchstart", doTouchStart, false);
addEventListener("touchmove", doTouchMove, false);

function doTouchStart(e){
	
	if(calIsVisible == false){
		e.preventDefault();
		showCalendar();		
	}else{
			
	}

}

function doTouchMove(e){
	e.preventDefault();
}


$('#nativedate').change = function(){
	console.log("derfe");
}

// <input type="date" onblur="testdate(this)" onchange="testdate(this,true)" />

$('#datepicker').datepicker({
   onSelect: function(dateText, inst) { 
   		hideCalendar();
   		showDate(dateText);

    }
});

$('#datepicker').datepicker({
	inline: true
});

function doit(){

	console.log("do it date changed");
}

hideCalendar();

firstTimeDate();

$('#moon').click(function(){
	showCalendar();

});

function showCalendar(){
	// $('#datepicker').show();
	console.log("showasdfkjewr");
	$('#nativedate').show();
	calIsVisible = true;
}

function hideCalendar(){
	// $('#datepicker').hide();
	$('#nativedate').hide();
	
	calIsVisible = false;
}

function showDate(d){
	calculateDateAndPhase(d);

	//$('#date').html(d);
   	$('#moon .phase').hide();
   	//$('#moon .phase').eq(Math.floor(Math.random()*10 ) ).show();;
    //console.log(parseInt(calculateDateAndPhase( d )*100));
    
    var layerToShow = parseInt(Math.floor(pct*totalFrames));
    var labelToShow = parseInt(Math.round(pct*moonLabelsArr.length));
   // $('#date').html(labelToShow+" layer #"+layerToShow+" "+parseInt(pct*100)+"%");
    //$('#date').append("<strong> "+moonLabelsArr[labelToShow]+" </strong>");
    $('#panelleft #dayofweek').html(dowArray[dayOfWeek]);
    $('#panelleft #date').html(day);
    $('#panelright #month').html(monthArray[month-1]);
    $('#panelright #year').html(year);
    $('#panelright #status').html(moonLabelsArr[labelToShow]);
    setPointer();

    $('#moon .phase').eq(layerToShow).show();
   	//calculateDateAndPhase(d);
}

function calculateDateAndPhase(d){
	var dNumsArr = d.split("/")
	date = new Date(dNumsArr[2], dNumsArr[0]-1, dNumsArr[1]); //birthday = new Date(1995,11,17); year / month / day // 10/30/2012 from picker
	
	day = date.getDate();
	dayOfWeek = date.getDay();
	month = date.getMonth()+1;
	year = date.getFullYear();

	//
	var daysElapsed = millsToDays(date.getTime()-origDate.getTime() ); //days elapsed since origDate
	var daysSinceLast = daysElapsed%synodicMonth; 
	pct = daysSinceLast/synodicMonth;
	//

	//$('#date').html("<br>"+date+"<br>"+origDate+"<br>"+parseInt(daysSinceLast/synodicMonth*10)+"<br>");
	/*$('#date').append(" <br> "
		+daysSinceLast+" <br> "
		+pct+" %");*/
	return pct;

}

function setPointer(){
	var _pct = parseInt(pct*100);
	//if 0-50, add 50
	if(_pct<50){
		_pct+=50;
	}else{ _pct -= 50};
	
	$('#iconstrip #pointer').css('left', _pct+"%");
}

function firstTimeDate(){
	var date = new Date();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var y = date.getFullYear();

	var now = m + "/" + d + "/" + y;
	//calculateDateAndPhase(now);
	showDate(now);

}

function millsToDays(mills){
	return parseInt(mills/1000/60/60/24);
}

});


