var ouClicker = {};

(function() {

	//Define application state variables in this namespace
	ouClicker.app = {};

	// Miscelaneous data
	ouClicker.data = {};
	ouClicker.data.key = 0;
	ouClicker.data.questionId = 0;
	ouClicker.data.desc = '0';
	ouClicker.data.blocked = 0;
	ouClicker.data.questionType = -1;
	ouClicker.data.password = 'xxx';
	ouClicker.data.control;
	ouClicker.data.answer = '';

	// Location data
	ouClicker.location = {};
	ouClicker.location.longitude = 0;
	ouClicker.location.latitude = 0;
	ouClicker.location.altitude = 0;
	ouClicker.location.heading = '';
	ouClicker.location.currentLocation = '';
	ouClicker.location.accuracy = 0;
	ouClicker.location.speed = 0;
	ouClicker.location.timestamp = '';
	ouClicker.location.altitudeAccuracy = 0;
	ouClicker.location.city = 'Aachen';
	ouClicker.location.time = '25/08/1999';
	ouClicker.location.reverseGeo = '';
	ouClicker.location.forwardGeo = '';

})();

Ti.include(
'/ouClicker/utils/utils.js',
'/ouClicker/model/model.js',
'/ouClicker/google/google.js',
'/ouClicker/location/location.js',
'/ouClicker/ui/ui.js'
);