app.view.ui.success = {};

// Self invoking function
(function() {

	app.view.ui.getSuccessWindow = function () {

		var winSuccess = Titanium.UI.createWindow({
			className:'winSuccess',
			title:'CELSTEC clicker ',
			backgroundColor:'#fff',
			barColor:'#13386c'
		});

/*
		var mainLabel = Titanium.UI.createLabel({
			text:'SUCCESS WINDOW',
			top:10,
			left:30,
			width:'auto',
			height:'auto'
		});

		winSuccess.add(mainLabel);
*/


/*
 * 
var ta = Ti.UI.createTextArea({
	autoLink:Ti.UI.AUTODETECT_ALL,
	left:5, top: 5, right: 5, height: 80,
	editable: false, // this needs to be set to false, otherwise data detection type will fail
	backgroundColor:'#ccc',
	value:'Contact\n test@test.com\n 817-555-5555\n http://bit.ly\n 444 Castro Street, Mountain View, CA'
});



 * 
 * 
 */

		var ta = Ti.UI.createTextArea({
			autoLink:Ti.UI.AUTODETECT_LINK,
			font:{fontFamily:'Arial',fontSize:12},
			left:5,
			top:50,
			right:5,
			height:50,
			editable: false, // this needs to be set to false, otherwise data detection type will fail
			// value:'See results \n  http://audientiasurvey.appspot.com/columnChartServlet'
			backgroundColor:'#ccc',
			value:'See results  http://audientiasurvey.appspot.com/columnChartServlet'
		});
		winSuccess.add(ta);

		/*
		 var forwardButton = Titanium.UI.createButton({
		 title:'Re-start >>',
		 top:280,
		 height:30,
		 width:150
		 });
		 forwardButton.addEventListener('click', function(e) {

		 winSuccess.close();
		 myController.successForward();

		 });
		 winSuccess.add(forwardButton);
		 */

		return winSuccess;
	}
})();