(function() {
	var tableName = 'GameData';
	var id = 'id';
	var creator = 'creator';
	var title = 'title';
	var feedUrl = 'feedUrl';
	var tableid = 'tableid';

	ar.db.gameData = {};

	ar.db.init.gameDataTable = function() {
		ar.db.createTable(
		tableName, {
			id: ar.db.TXT,
			creator: ar.db.TXT,
			title: ar.db.TXT,
			feedUrl: ar.db.TXT,
			tableid: ar.db.TXT,
		});
	}
	ar.db.drop.gameDataTable = function() {
		ar.db.dropTable(tableName);
	}
	ar.db.gameData.fusionUpdate = function(args) {
		Ti.API.info('gameData update');
		var gameDataIdentifiers = ar.db.myGames.listIdentifiers();
		for (var i=0; i < gameDataIdentifiers.length; i++) {
			ar.google.fusion.query({
				sql: "SELECT * FROM "+gameDataIdentifiers[i],
				tableid: gameDataIdentifiers[i],
				success: function(result) {
					var db = ar.db.openDatabase();
					var sql = 'DELETE FROM '+tableName + ' WHERE '+id+' = \''+result.getValue(0,id)+'\'';
					db.execute(sql);
					sql = 'INSERT INTO '+tableName+' ('+id+', '+ creator + ', '+ title + ', '+ feedUrl + ', '+ tableid + ') VALUES(\''+result.getValue(0,id)+'\',\''+result.getValue(0,creator)+'\',\''+result.getValue(0,title)+'\',\''+result.getValue(0,feedUrl)+'\',\''+result.tableid()+'\' )';
					db.execute(sql);
					db.close();
					if (args.success)
						args.success();

				}
			});
		};
	}
	ar.db.gameData.getGameData = function() {
		var returnObject = {};
		var db = ar.db.openDatabase();
		var sql = 'SELECT * FROM '+ tableName ;
		var rows = db.execute(sql);
		if (rows.rowCount == 0)
			return returnObject;
		do {
			var rowid = rows.fieldByName(id);
			if (rowid != '') {
				returnObject[rowid] = {};
				returnObject[rowid] [creator] = rows.fieldByName(creator);
				returnObject[rowid] [title] = rows.fieldByName(title);
				returnObject[rowid] [feedUrl] = rows.fieldByName(feedUrl);
				returnObject[rowid] [tableid] = rows.fieldByName(tableid);
			}
		} while (rows.next())
		rows.close();
		db.close();
		return returnObject;
	}
})();