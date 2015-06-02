app.controller = {};

Ti.include("./utils/utils.js");

app.controller.MyController = function() {

	return {
		
		//-------------------------------------------
		// View interface
		//-------------------------------------------
		startWindow: function() {
			myView.getStartWindow();
		},
		mainForward: function() {
			myView.getFaseVisualWindow();
		},
		visualForward: function() {
			Ti.API.debug("MyController.visualForward");			
			myView.getVisualFeedbackWindow();
		},
		visualFeedbackForward: function() {			
			Ti.API.debug("MyController.visualFeedbackForward");
			myView.getOlfativaWindow();
		},
		olfativaForward: function() {			
			myView.getOlfativaFeedbackWindow();
		},
		olfativaFeedbackForward: function() {			
			myView.getGustativaWindow();
		},
		gustativaForward: function() {			
			myView.getGustativaFeedbackWindow();
		},
		gustativaFeedbackForward: function() {			
			myView.getScoreWindow();
		},		
		
		
		//-------------------------------------------
		// Model interface
		//-------------------------------------------
		
		//
		// Session 
		//
		isCorrectPassword: function(pwd) {			
			return (pwd == myModel.getPassword());
		},		
		
		
		//
		// Database queries
		//				
		getOptions: function(callback) {

			app.model.db.gfusion.query({
				sql: myModel.getOptionsSentence(),
				success: function(result) {

					Ti.API.debug("The json getOptions result>"+JSON.stringify(result.getJSON())+"<");

					app.controller.utils.parseJson(result.getJSON(), function(arrayItems) {
/*
						for (i=0; i < arrayItems.length; i++) {
							Ti.API.debug("Results from query: "+i);
							Ti.API.debug("-question "+arrayItems[i]['question']);
							Ti.API.debug("-questionTypeId "+arrayItems[i]['questionTypeId']);
							Ti.API.debug("-optionDesc "+arrayItems[i]['optionDesc']);
							Ti.API.debug("-optionValue "+arrayItems[i]['optionValue']);
							Ti.API.debug("-order "+arrayItems[i]['order']);
						}
*/
						callback(arrayItems);

					});
				}
			});

		},
		getQuestions: function(callback) {

			app.model.location.getCity( function(city) {
				Ti.API.debug("The city "+city);

				app.model.db.gfusion.query({
					sql: myModel.getQuestionnairesSentence(city),
					success: function(result) {

						//Ti.API.debug("The json result>"+JSON.stringify(result.getJSON())+"<");

						app.controller.utils.parseJson(result.getJSON(), function(arrayItems) {

							/*
							 for (i=0; i < arrayItems.length; i++) {
							 Ti.API.debug("Results from query: "+i);
							 Ti.API.debug("-questionnaireId "+arrayItems[i]['questionnaireId']);
							 Ti.API.debug("-description "+arrayItems[i]['description']);
							 Ti.API.debug("-blocked "+arrayItems[i]['blocked']);
							 Ti.API.debug("-password "+arrayItems[i]['password']);
							 }
							 */

							callback(arrayItems);

						});
					}
				});

			});
		},
		saveAnswer: function() {

			app.model.db.gfusion.authentication.login({
				service : myModel.getDBAuthParams().service,
				Email : myModel.getDBAuthParams().email,
				Passwd : myModel.getDBAuthParams().password,
				success: function(result) {
					Ti.API.info("Insert sentence ["+myModel.getAnswerSentence()+"]");
					app.model.db.gfusion.insert({
						sql: myModel.getAnswerSentence(),
						success: function(result) {
							Ti.API.info("Data was succesfully stored.");
							//myView.getQuestionForwardWindow().open();
							// TODO
							// Do something here when data is correctly storesd
						}
					});
				}
			});

		}
	}
}