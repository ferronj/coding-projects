function revealMessage() {
	document.getElementById("hiddenMessage").style.display = 'block';
}

function countDown() {
	var currentVal = document.getElementById("countDownButton").innerHTML;
	if (currentVal > 0) {
		var newVal = currentVal - 1;
	}
	if (newVal) {
		document.getElementById("countDownButton").innerHTML = newVal;
	} else {
		document.getElementById("countDownZeroMsg").style.display = 'block';
		document.getElementById("countDownButton").innerHTML = 0;
	}
}

$(document).ready(function() {
	$("#hidden").hover(function() {
		$(this).css("color", "black")
	}, 
	function() {
		$(this).css("color", "white")
		/*This was the "hide" function - saving this for
		the interesting reference, for the moment, however,
		it creates some strange formatting issues
		$(this).hide();
		$(this).css("display", "none")
		*/
	});
	$("#alertButton").click(function() {
		alert("I'm alerting you");
	});
});