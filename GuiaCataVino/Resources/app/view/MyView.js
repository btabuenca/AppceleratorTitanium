app.view = {};

Ti.include("./ui/ui.js");

app.view.MyView = function() {
	
	Ti.API.debug("btabuenca. This should be created only onceeeeeeeeeeeeeeeeee");
	// This should be created only once
	var tabGroup = Titanium.UI.createTabGroup();

	var tabClicker = Titanium.UI.createTab({  
	    icon:'./images/KS_nav_ui.png',
	    title:'Taste'
	});
	
	
	// Course window
	var winCourse = app.view.ui.getCourseWindow();
	//tabCourse.open();
		
	var tabCourse = Titanium.UI.createTab({  
	    icon:'./images/KS_nav_ui.png',
	    title:'Course',
	    window:winCourse
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
	tabGroup.addTab(tabCourse);  
	tabGroup.addTab(tabCredits);
	
	
	
	
				
	return {
		//
		// Navigation
		//
		getStartWindow: function() {

			tabClicker.window = app.view.ui.getMainWindow();
			tabGroup.open();
		},
/*		
		getCourseWindow: function() {

			tabCouse.window = app.view.ui.getCourseWindow();
			tabCourse.open();
		},
*/				
		getFaseVisualWindow: function() {
			Ti.API.debug("MyView.js.Get fase visual window. Selected option "+app.model.session.wine.id);
			//tabClicker.window = app.view.ui.getVisualWindow();
			//tabGroup.open();
			//return app.view.ui.getVisualWindow();
			
			tabGroup.activeTab.open(app.view.ui.getVisualWindow(),{animated:true});
			
			
		},
		getVisualFeedbackWindow: function() {
			Ti.API.debug("MyView.js.Get fase visual feedback window.");
			//tabClicker.window = app.view.ui.getVisualWindow();
			//tabGroup.open();
			//return app.view.ui.getVisualWindow();
			
			tabGroup.activeTab.open(app.view.ui.getVisualFeedbackWindow(),{animated:true});
			
			
		},
		getQuestionForwardWindow: function() {
			return app.view.ui.getSuccessWindow();
		},
		getQuestionBackWindow: function() {
			return app.view.ui.getMainWindow();
		},
		getSuccessForwardWindow: function() {
			return app.view.ui.getMainWindow();
		}
	}
}
