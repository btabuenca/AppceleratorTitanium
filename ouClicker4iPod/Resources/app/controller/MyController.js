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
		availableForward: function(isBlocked) {
			//Ti.API.debug("Password? :"+isBlocked);
			myView.getAvailableForwardWindow(isBlocked);
		},
		loginForward: function() {			
			myView.getLoginForwardWindow();
		},
		loginBack: function() {
			// TODO Cleaning functions like this one that are not used anymore
			myView.getLoginForwardWindow().open();
		},
		questionForward: function() {
			// TODO Instead of showing open window
			// it should tell that data was stored
			// successfully and go to the beginning.
			
			// TODO Implement configuration feature so that 
			// same device can/cannot vote more than once
			
			myView.getQuestionForwardWindow().open();
		},
		questionBack: function() {
			myView.getQuestionBackWindow().open();
		},
		forbiddenForward: function() {
			myView.getForbiddenForwardWindow().open();
		},
		forbiddenBack: function() {
			myView.getForbiddenBackWindow().open();
		},
		successForward: function() {
			myView.getSuccessForwardWindow().open();			
		},
		successBack: function() {
			myView.getSuccessBackWindow().open();
		},
		successSlider: function() {
			myView.getSaveSliderWindow();
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
		
		saveSlider: function() {

			app.model.db.gfusion.authentication.login({
				service : myModel.getDBAuthParams().service,
				Email : myModel.getDBAuthParams().email,
				Passwd : myModel.getDBAuthParams().password,
				success: function(result) {
					Ti.API.info("Insert sentence ["+myModel.getSliderSentence()+"]");
					app.model.db.gfusion.insert({
						sql: myModel.getSliderSentence(),
						success: function(result) {
							Ti.API.info("Data was succesfully stored."+result);
							
							
/*
 * 
							// Thanks for voting message  												
							var welcomeWindow = Titanium.UI.createWindow({
								height:80,
								width:200,
								touchEnabled:false
							});
					
							// black view
							var indView = Titanium.UI.createView({
								height:80,
								width:200,
								backgroundColor:'#000',
								borderRadius:10,
								opacity:0.8,
								touchEnabled:false
							});
							welcomeWindow.add(indView);
					
							// message
							var message = Titanium.UI.createLabel({
								text:'Thanks for voting!',
								color:'#fff',
								textAlign:'center',
								font:{fontSize:18,fontWeight:'bold'},
								height:'auto',
								width:'auto'
							});
							welcomeWindow.add(message);
							welcomeWindow.open();
					
							var animationProperties = {delay: 1500, duration: 1000, opacity: 0.1};
							if (Ti.Platform.osname == "iPhone OS") {
								animationProperties.transform =
									Ti.UI.create2DMatrix().translate(-200,200).scale(0);
							}
							welcomeWindow.animate(animationProperties, function()
							{
								welcomeWindow.close();
							});
														
*/							
							
							
/*							
							// Added for webview

var w = Ti.UI.createWindow();
	w.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];

	var webview = null;

webview = Ti.UI.createWebView();
webview.url = "http://audientiasurvey.appspot.com/columnChartServlet";
		webview.addEventListener('load',function(e)
		{
			Ti.API.debug("webview loaded: "+e.url);
		});

w.add(webview);



							w.open();
					
var animationProperties = {delay: 1000, duration: 10000, opacity: 0.1};					
							w.animate(animationProperties, function()
							{
								w.close();
							});




Ti.API.info("Esto  funcionaaaaaaaaa");
*/
														
							
							
							
							
							//myView.getQuestionForwardWindow().open();
							// TODO
							// Do something here when data is correctly storesd
						}
					});
				}
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