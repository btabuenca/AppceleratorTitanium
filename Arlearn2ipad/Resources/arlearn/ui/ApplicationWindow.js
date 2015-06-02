/**
 * ARLearn Platform
 * Copyright (c) 2009-2011 by Open Universiteit. All Rights Reserved.
 * ARLearn2 is licensed under the terms of GNU GENERAL PUBLIC LICENSE (Version 2, June 1991). 
  * Please see the LICENSE included with this distribution for details.
  * Author: Stefaan Ternier
 **/

(function() {

	var tabGroup = Titanium.UI.createTabGroup({
		id:'tabGroup1'
	});

	SplitViewNav = {};
	
	ar.ui.loadDetailView = function(view) {
		// SplitViewNav.detailNav.open(win);
		SplitViewNav.detailWindow.add(view)
		// SplitViewNav.detailNav = (win);
						Ti.API.info("clicked now loading before show")

		
	}
	
	//todo remove this method
	ar.ui.loadDetailWindow = function(win) {
		SplitViewNav.detailNav.open(win);
	}
	
	ar.ui.createApplicationWindow = function(_args) {

		ar.ui.initTabGroup();

		SplitViewNav.masterWindow = Ti.UI.createWindow({
			title: 'Settings'
		});
		
		SplitViewNav.masterWindow.add(tabGroup);		

		SplitViewNav.detailWindow = Ti.UI.createWindow({
			title:'Detail',
			backgroundColor:'#336699'
		});

		SplitViewNav.detailNav = Ti.UI.iPhone.createNavigationGroup({
			window:SplitViewNav.detailWindow
		});

		SplitViewNav.splitView = Titanium.UI.iPad.createSplitWindow({
			masterView:SplitViewNav.masterWindow,
			detailView:SplitViewNav.detailNav,
		});

		SplitViewNav.open = function() {
			tabGroup.open();
			SplitViewNav.splitView.open();
		};
		
		SplitViewNav.splitView.addEventListener('visible', function(e) {
			if (e.view == 'detail') {
				e.button.title = "Settings";
				SplitViewNav.detailWindow.leftNavButton = e.button;
			} else if (e.view == 'master') {
				SplitViewNav.detailWindow.leftNavButton = null;
			}
		});
		return SplitViewNav;
	};
	
	ar.ui.initTabGroup = function(_args) {
		
		var configTab = Titanium.UI.createTab({
			titleid:'Configuration',
			icon:'images/settings.png',
			window:ar.ui.getConfigWindow()
		});

		tabGroup.addTab(configTab);
		
		
		tabGroup.setActiveTab(0);

		
	};
	
	ar.ui.addTabWindow = function(win) {
		var tab = Titanium.UI.createTab({
			titleid:'New tab',
			icon:'images/settings.png',
			window:win
		});
		tabGroup.addTab(tab);
	}
	
})();