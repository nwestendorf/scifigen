// functions


// UI experience
function paginateTab(tab) {
	var givenTab = tab.parents('.tab');
	if(givenTab.hasClass('active')) {
		givenTab.find('.value').slideUp();
		givenTab.removeClass('active');
	} else {
		givenTab.addClass('active');
		givenTab.find('.value').slideDown();
	}
}

function saveWorld() {

}

// takes a large number and adds commas (for display as string)
function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

// shuffles an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateNewWorld() {
	// ui
	jQuery('.tab').each(function() {
		jQuery(this).find('.value').html('');
		jQuery(this).removeClass('empty');
	});

	// PHYSICAL
	var plDiameter = Math.random() * (23754 - 3400) + 3400;
	plDiameter = Math.ceil(plDiameter);

	// 7918 .. 23754 .... Math.random()* (popMax/8 - popMin) + popMin

	var physicalComponents = [
		'iron', 'oxygen/hydrogen', 'magnesium', 'silicon', 'carbon/carbonic compounds', 'calcium', 'nickel', 'sulfur', 'aluminum', 'rare metals'
	];
	var physicalBreakdown = [];
	var phAvailablePercentage = 100;
	var phPercentage = 0;
	var x = 0;
	while(x < physicalComponents.length) {
		phPercentage = Math.ceil(Math.random() * (phAvailablePercentage));
		if(phAvailablePercentage < 0) {
			break;
		} else {
			physicalBreakdown.push(phPercentage);
			phAvailablePercentage = phAvailablePercentage - phPercentage;
		}
	x++;
	}
	physicalBreakdown = shuffle(physicalBreakdown);
	jQuery('#physical .value').html('Diameter: '+commaSeparateNumber(plDiameter)+'mi ('+Math.round((plDiameter/7918)*100)/100 +' Earth dia.)<br/>'
	+ physicalComponents[0] + ': ' + physicalBreakdown[0] + '%<br/>'
	+ physicalComponents[1] + ': ' + physicalBreakdown[1] + '%<br/>'
	+ physicalComponents[2] + ': ' + physicalBreakdown[2] + '%<br/>'
	+ physicalComponents[3] + ': ' + physicalBreakdown[3] + '%<br/>'
	+ physicalComponents[4] + ': ' + physicalBreakdown[4] + '%<br/>'
	+ physicalComponents[5] + ': ' + physicalBreakdown[5] + '%<br/>'
	+ physicalComponents[6] + ': ' + physicalBreakdown[6] + '%<br/>'
	+ physicalComponents[7] + ': ' + physicalBreakdown[7] + '%<br/>'
	+ physicalComponents[8] + ': ' + physicalBreakdown[8] + '%<br/>'
	+ physicalComponents[9] + ': ' + physicalBreakdown[9] + '%<br/>'
	);



	// ATMOSPHERE
	var atBbreathable;
	var atmosphereComponents = [
		'oxygen', 'carbon dioxide', 'nitrogen', 'helium', 'hydrogen', 'argon', 'methane'
	];
	var atmosphereBreakdown = [];
	var availablePercentage = 100;
	var atPercentage = 0;
	var z = 0;
	while(z < atmosphereComponents.length) {
		atPercentage = Math.ceil(Math.random() * (availablePercentage));
		if(availablePercentage < 0) {
			break;
		} else {
			atmosphereBreakdown.push(atPercentage);
			availablePercentage = availablePercentage - atPercentage;
		}
		z++;
	}
	atmosphereBreakdown = shuffle(atmosphereBreakdown);
	var atDensity = Math.ceil(Math.random() * 200);
	if(atDensity > 75 && atDensity < 175 && atmosphereBreakdown[0] > 15 && atmosphereBreakdown[0] < 80 && atmosphereBreakdown[1] < 11 && atmosphereBreakdown[2] > 30 && atmosphereBreakdown[6] < 50){
		atBreathable = 'Atmosphere Breathable';
	} else if(atDensity > 25 && atmosphereBreakdown[0] > 10 && atmosphereBreakdown[0] < 90 && atmosphereBreakdown[1] < 20 && atmosphereBreakdown[6] < 70) {
		atBreathable = 'Atmosphere Manageable for Periods of Time';
	} else {
		atBreathable = 'Atmosphere Toxic';
	}



	// POPULATION MATH
	var popMax = 12000000000;
	var popMin = 1000000;
	if(Math.random() > 0.8) {
		var population = 0;
	}
	else if(Math.random() > 0.4) {
		var population = Math.ceil((Math.random()* (popMax/8 - popMin) + popMin)/1000)*1000;
	} else {
		var population = Math.ceil((Math.random()* (popMax - popMin) + popMin)/1000)*1000;
	}


	population = commaSeparateNumber(population);


	// NAME MATH
	var nameStrings1 = [
		'Sav', 'Lor', 'Marc', 'Kath', 'Koth',
		'Mir', 'Vat', 'Keer', 'Way', 'Toor',
		'Meik', 'Lar', 'Xen', 'Zerz', 'Tot',
		'Bru', 'Bur', 'Cuth', 'Cam', 'Duhn'
	];
	var nameStrings2 = [
		'ama', '-borm', 'cosh', 'delm', 'erz',
		'fome', 'gharl', 'ham', 'iis', 'jarl',
		'kael', '-lour', 'mon', 'narn', 'oohl',
		'path', 'qur', 'rahm', 'si', '-tweal', 'uuztah',
		'vee', 'whaulm', 'xyem', 'yem', 'zil'
	];
	var nameStrings3 = [
		'brien', '-hael', 'almon', 'tagan', 'zeermar', 'tooth'
	];
	var selector1 = Math.floor(Math.random() * (nameStrings1.length - 1) + 1);
	var selector2 = Math.floor(Math.random() * (nameStrings2.length - 1) + 1);
	var selector3 = Math.floor(Math.random() * (nameStrings3.length - 1) + 1);
	var finalName = nameStrings1[selector1];
	if(Math.random() > 0.5) {
		finalName = finalName + nameStrings3[selector3];
	}
	finalName = finalName + nameStrings2[selector2];




	// RETURN
	jQuery('#name .value').html(finalName);
	jQuery('#population .value').html(population);
	jQuery('#atmosphere .value').html(atmosphereComponents[0] + ': ' + atmosphereBreakdown[0] + '%<br/>'
	+ atmosphereComponents[1] + ': ' + atmosphereBreakdown[1] + '%<br/>'
	+ atmosphereComponents[2] + ': ' + atmosphereBreakdown[2] + '%<br/>'
	+ atmosphereComponents[3] + ': ' + atmosphereBreakdown[3] + '%<br/>'
	+ atmosphereComponents[4] + ': ' + atmosphereBreakdown[4] + '%<br/>'
	+ atmosphereComponents[5] + ': ' + atmosphereBreakdown[5] + '%<br/>'
	+ atmosphereComponents[6] + ': ' + atmosphereBreakdown[6] + '%<br/>'
	+'Density: '+atDensity+'% Earth Norm<br/>'
	+ atBreathable);

}

function listSavedWorlds() {

}

function loadSavedWorld(name) {

}

// execution

jQuery(document).ready(function() {
	jQuery('#generate').click(function() {
		jQuery('#world').html(generateNewWorld());
	});
	jQuery('.tab .label').click(function() {
		paginateTab(jQuery(this));
	});
});