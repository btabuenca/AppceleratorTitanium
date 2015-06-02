/**
 * ARLearn Platform
 * Copyright (c) 2009-2011 by Open Universiteit. All Rights Reserved.
 * ARLearn2 is licensed under the terms of GNU GENERAL PUBLIC LICENSE (Version 2, June 1991).
 * Please see the LICENSE included with this distribution for details.
 * Author: Stefaan Ternier
 **/

(function() {
	var mainWindow = Titanium.UI.createWindow({
		 navBarHidden: true
	});
	
	//ar.ui.configTab.getTableView = 
	function getTableView () {
		var data = [{
			title:"Map",
			header: 'Debug',
			detailView:ar.ui.createMapView
		},{
			title:"Game",
			header: 'Load',
			win:ar.ui.configTab.getMyGamesWindow
		},
		];

		var tableview = Ti.UI.createTableView({
			style:Ti.UI.iPhone.TableViewStyle.GROUPED,
			data:data
		});

		tableview.addEventListener('click', function(e) {
			if (e.rowData.detailView) {
				ar.ui.loadDetailView(e.rowData.detailView())
			}
			if (e.rowData.win) {
				e.rowData.win.previousWin = currentWindow;
				currentWindow = e.rowData.win();
				nav.open(currentWindow)
			}
		});
		return tableview;
	}

	
	var tableWin = Titanium.UI.createWindow({
		 title:"Red Window",
		  navBarHidden: true
	});
	var currentWindow = getTableView();
	tableWin.add( currentWindow)
	
	var nav = Titanium.UI.iPhone.createNavigationGroup({
		window:tableWin
	});
	
	mainWindow.add(nav);

	
	ar.ui.getConfigWindow = function() {
		return mainWindow;
	}
	
	ar.ui.configTab.popNav = function() {
		
		nav.close(currentWindow);
		if (currentWindow.previouwWin) currentWindow = currentWindow.previouwWin
	}
	
})();