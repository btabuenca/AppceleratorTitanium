/**
 * ARLearn Platform
 * Copyright (c) 2009-2011 by Open Universiteit. All Rights Reserved.
 * ARLearn2 is licensed under the terms of GNU GENERAL PUBLIC LICENSE (Version 2, June 1991).
 * Please see the LICENSE included with this distribution for details.
 * Author: Stefaan Ternier
 **/

(function() {

	
	ar.ui.configTab.getMyGamesWindow = function() {
		var win = Titanium.UI.createWindow();
		var gameData =ar.db.gameData.getGameData(); 
		var data = [];
		for (var gameid in gameData) {
					Ti.API.info("gameData "+gameid+ ' ' +JSON.stringify(gameData[gameid]));
					data.push({
						title: gameData[gameid].title,
						id: gameid
					})
		}
		var tableview = Ti.UI.createTableView({
			style:Ti.UI.iPhone.TableViewStyle.GROUPED,
			data:data
		});

		tableview.addEventListener('click', function(e) {
			ar.ui.configTab.popNav();
			ar.ui.map.loadGeneralItems();
		});
		win.add(tableview)
		return win;
	}
})();