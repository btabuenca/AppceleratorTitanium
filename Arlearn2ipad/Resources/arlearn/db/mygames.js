(function() {
	var tableName = 'MyGames';
	var Tableid = 'Tableid';

	ar.db.myGames = {};

	ar.db.init.myGamesTable = function() {
		ar.db.createTable(
		tableName, {
			Tableid: ar.db.INT,
		});
	}
	ar.db.drop.myGamesTable = function() {
		ar.db.dropTable(tableName);
	}
	//ar.db.myGames.tableid = '871704';

	ar.db.myGames.setMyGamesTableId = function(args) {
		ar.google.fusion.showTables({
			success: function(table) {
				var rowId = table.rowIdForValue(1, "MyGames");
				if (rowId == -1) {
					Titanium.App.Properties.setString("ar.db.myGames.tableid","table.getValue(rowId, 0)", "-1");
				} else {
					Titanium.App.Properties.setString("ar.db.myGames.tableid",table.getValue(rowId, 0));
					if (args.success) args.success();	
				}
				
			}
		});
	};
	
	ar.db.myGames.fusionUpdate = function(args) {
		Ti.API.info('fusion update');
		if (Titanium.App.Properties.getString("ar.db.myGames.tableid", '-1') != '-1') {
			ar.google.fusion.query({
				sql: "SELECT * FROM "+Titanium.App.Properties.getString("ar.db.myGames.tableid"),
				success: function(result) {
					var db = ar.db.openDatabase();
					var sql = 'DELETE FROM '+tableName;
					db.execute(sql);
					for (var i=0; i < result.rowSize(); i++) {
						var sql = 'INSERT INTO '+tableName+' ('+Tableid+') VALUES('+result.getValue(i,result.getColumnIndex('tableid'))+')';
						db.execute(sql);
					};

					db.close();
					if (args.success) args.success();

				}
			})
		}
	}
	ar.db.myGames.listIdentifiers = function() {
		var returnList = [];
		var db = ar.db.openDatabase();
		var sql = 'SELECT * FROM '+ tableName ;
		var rows = db.execute(sql);
		if (rows.rowCount == 0)
			return returnList;
		do {
			var tableid = rows.fieldByName(Tableid);
			returnList.push(tableid)
		} while (rows.next())
		rows.close();
		db.close();
		return returnList;
	}
})();