app.view = {};

Ti.include("./ui/ui.js");

app.view.MyView = function() {
	
	Ti.API.debug("btabuenca. This should be created only onceeeeeeeeeeeeeeeeee");
	// This should be created only once
	var tabGroup = Titanium.UI.createTabGroup();

	var tabClicker = Titanium.UI.createTab({  
	    icon:'./images/KS_nav_ui.png',
	    title:'Clicker'
	});	
	

	// Credits window
	var winCredits = Titanium.UI.createWindow({  
	    title:'Credits',
	    backgroundColor:'#fff'
	});
	
	var labelCredits = Titanium.UI.createLabel({
		color:'#999',
		text:'Bernardo Tabuenca\nbernardo.tabuenca@ou.nl\nOpen University of The Netherlands',
		font:{fontSize:14,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});
	
	winCredits.add(labelCredits);
	
	var tabCredits = Titanium.UI.createTab({  
	    icon:'./images/KS_nav_views.png',
	    title:'Credits',
	    window:winCredits
	});	

	
	// Add all tabs to group
	tabGroup.addTab(tabClicker);  
	tabGroup.addTab(tabCredits);
	
	
	
	
				
	return {
		//
		// Navigation
		//
		getStartWindow: function() {

			tabClicker.window = app.view.ui.getAvailableWindow();
			tabGroup.open();
		},
		getAvailableForwardWindow: function(isBlocked) {
			if (isBlocked.length > 0) {
				Ti.API.debug("btabuenca. Debugging getAvailableForwardWindow. It is blocked.");
				tabGroup.activeTab.open(app.view.ui.getLoginWindow(),{animated:true});
			} else {
				Ti.API.debug("btabuenca. Debugging getAvailableForwardWindow. It is NOT blocked.");
				tabGroup.activeTab.open(app.view.ui.getQuestionWindow(),{animated:true});
			}
		},
		getLoginForwardWindow: function() {
			Ti.API.debug("btabuenca. Debugging getLoginForwardWindow");
			tabGroup.activeTab.open(app.view.ui.getQuestionWindow(),{animated:true});
			//return app.view.ui.getQuestionWindow();
		},
		getLoginBackWindow: function() {
			return app.view.ui.getAvailableWindow();
		},
		getForbiddenForwardWindow: function() {
			return app.view.ui.getAvailableWindow();
		},
		getForbiddenBackWindow: function() {
			return app.view.ui.getLoginWindow();
		},
		getQuestionForwardWindow: function() {
			return app.view.ui.getSuccessWindow();
		},
		getQuestionBackWindow: function() {
			return app.view.ui.getAvailableWindow();
		},
		getSuccessForwardWindow: function() {
			return app.view.ui.getAvailableWindow();
		}
	}
}
