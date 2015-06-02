(function() {

	ouClicker.google = {};
	ouClicker.go = ouClicker.google;
	
	// Constant definition for table ids
	ouClicker.google.table = {};
	ouClicker.google.table.questionsOptions = 1226374;
	ouClicker.google.table.answers = 1100020;
	ouClicker.google.table.questionnaire = 1099569;
	
	
	ouClicker.google.jsonCallback = function(json) {
		return json;
	}
	
	
})();

Ti.include(
	'/ouClicker/google/fusion.js'
	,'/ouClicker/google/login.js'
);
