app.view.ui.login = {};

// Self invoking function
(function() {

	app.view.ui.getLoginWindow = function () {

		var winLogin = Titanium.UI.createWindow({
			className:'winLogin',
			title:'Clicker',
			backgroundColor:'#ffffff',
			barColor:'#13386c'
		});

		var mainLabel = Titanium.UI.createLabel({
			color:'#576996',
			font: {
				fontSize:16,
				fontWeight:'bold',
				fontFamily:'Arial'
			},
			text:'This question requires password:',
			top:110,
			left:30,
			width:'auto',
			height:'auto'
		});

		winLogin.add(mainLabel);

		var tf = Titanium.UI.createTextField({
			color:'#336699',
			height:35,
			top:130,
			left:30,
			width:250,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		winLogin.add(tf);

		var sendButton = Titanium.UI.createButton({
			title:'Send',
			top:180,
			height:30,
			width:150
		});
		sendButton.addEventListener('click', function(e) {

			if (myController.isCorrectPassword(tf.value)){
				winLogin.close();
				myController.loginForward();
			}else{
				var alertDialog = Titanium.UI.createAlertDialog({
					    title: 'CELSTEC clicker',
					    message: 'Incorrect password',
					    buttonNames: ['Try again','Dismiss']
				});
				alertDialog.show();				
				alertDialog.addEventListener('click', function(e) {					
					if(e.index == 1){
						// Dismissed
						winLogin.close();
						myController.startWindow();						
					}										
				});												
			}

		});
		winLogin.add(sendButton);

		return winLogin;
	}
})();