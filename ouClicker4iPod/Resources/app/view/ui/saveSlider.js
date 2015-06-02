app.view.ui.success = {};

// Self invoking function
(function() {

	app.view.ui.getSaveSliderWindow = function () {

		var w = Titanium.UI.createWindow({
			className:'winResults',
			title:'Results',
			backgroundColor:'#ffffff',
			barColor:'#13386c'
		});		
		
		var buttonDone = Titanium.UI.createButton({title:'Done'});
		buttonDone.addEventListener('click', function(e) {

			w.close();

		});		
		w.rightNavButton = buttonDone;	



							// Added for webview


	w.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];

	var webview = null;

webview = Ti.UI.createWebView();

// TODO: A servlet/jsp must be implemented in the app engine part
// so here id for current answer should be given as parameter
// something like this http://audientiasurvey.appspot.com/lineChart.html?answerid=eieiei
// the id in this case has to be timestamp

webview.url = "http://audientiasurvey.appspot.com/lineChart.html";
		webview.addEventListener('load',function(e)
		{
			Ti.API.debug("webview loaded: "+e.url);
		});

w.add(webview);


/*
							w.open();
					
var animationProperties = {delay: 1000, duration: 10000, opacity: 0.1};					
							w.animate(animationProperties, function()
							{

								Ti.API.debug("Animation ends ");
								w.close();
							});
*/



Ti.API.info("Esto  funcionaaaaaaaaa");




		return w;
	}
})();