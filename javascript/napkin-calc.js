"use strict"; 

// Alex Childers
// Last modified: 2019/04/28

// when button is clicked, calculate napkin use 
window.onload = 
	function()
	{
		var calculateButton = document.getElementById("calculate"); 
		calculateButton.onclick = napkinSurfaceUse; 
	}

/* 	expects the document to contain a napkin length, width, number of folds, 
	and units. 
	outputs the maximum surface area use to screen according to my formula
	as linked to on page, as well as the percent usage */ 
 
function napkinSurfaceUse()
{
	var lengthField = document.getElementById("length");
	var widthField = document.getElementById("width"); 
	var unitsField = document.getElementById("units"); 
	var foldsField = document.getElementById("folds"); 
	
	var length = lengthField.value.trim(); 
	var width = widthField.value.trim(); 
	var units = unitsField.value.trim(); 
	var folds = foldsField.value.trim(); 

	// result fields 
	var surfaceUseField = document.getElementById("surfaceArea"); 
	var percentField = document.getElementById("percentage");
	var resultMessage = document.getElementById("message");  
	
	// blank out field values 
	surfaceUseField.innerHTML = ""; 
	percentField.innerHTML = ""; 
	resultMessage.innerHTML = ""; 
	
	if ( (! length) || (! width) || (! units) || (! folds) )
	{
		resultMessage.innerHTML = "Please enter length, width, and how many "
			+ "times you can fold this napkin."; 
	}
	else
	{			
		length = parseFloat(length); 
		width = parseFloat(width); 
		folds = parseInt(folds); 
		
		// total surface area of the napkin, front and back 
		var surfaceArea = length * width * 2; 
		
		// how much of the napkin is used with the number of folds given 
		var surfaceUse = 0; 
		
		/* formula: surface area use = the sum from i=0 to # of folds of 
		(length * width)/(2^i) */  
		var i = 0; 
		for(i = 0; i <= folds; i++)
		{
			surfaceUse += ( (length * width) / (Math.pow(2, i) )); 
		}
		
		// given surfaceUse, calculate percent use 
		var percentUse = (surfaceUse / surfaceArea) * 100; 
		
		// output results to screen 
		surfaceUseField.innerHTML = surfaceUse + " " + units + "2".sup(); 
		resultMessage.innerHTML = "or" 
		percentField.innerHTML = percentUse + "% of the napkin"; 
	}
}
