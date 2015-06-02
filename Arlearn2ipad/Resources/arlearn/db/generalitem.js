(function() {
	var tableName = 'GeneralItem';
	var id = 'id';
	var radius = 'radius';
	var lat = 'lat';
	var lng = 'lng';
	var timeDelta = 'timeDelta';
	var name = 'name';
	var description = 'description';
	var type = 'type';
	var payload = 'payload';

	ar.db.generalItem = {};

	ar.db.init.generalItemTable = function() {
		ar.db.createTable(
		tableName, {
			id: ar.db.TXT,
			radius: ar.db.TXT,
			lat: ar.db.TXT,
			lng: ar.db.TXT,
			timeDelta: ar.db.TXT,
			name: ar.db.TXT,
			description: ar.db.TXT,
			type: ar.db.TXT,
			payload: ar.db.TXT,
		});
	}
	ar.db.drop.generalItemTable = function() {
		ar.db.dropTable(tableName);
	}
	function loadGeneralItemTable (gameDataTableId, method, gameId) {
		ar.google.fusion.showTables({
			success: function(table) {
				var ids = table.getTableIdsForName('GeneralItem_'+gameDataTableId);
				Ti.API.info('show tables'+ (ids.length > 0) );
				if (ids.length > 0) {
					Ti.API.info('show length'+ (ids.length > 0) );

					method(ids[0], gameId);
				}
			}
		});
	}

	ar.db.columnNamesToSQL = function(columnsList) {
		if (columnsList.length == 0)
			return ' ()';
		if (columnsList.length == 1)
			return ' ('+columnList[0]+')';
		var returnString = ' (' + columnsList[0];
		for (var i=1; i < columnsList.length; i++) {
			returnString += ','+ columnsList[i]
		};
		return returnString + ')'
	}
	ar.db.ValuesToSQL = function(columnsList) {
		if (columnsList.length == 0)
			return ' ()';
		if (columnsList.length == 1)
			return ' (?)';
		var returnString = ' (?';
		for (var i=1; i < columnsList.length; i++) {
			returnString += ', ?'
		};
		return returnString + ')'
	}
	
	function updateLocalDbFromFusion(fusionTableId, gameId) {
		Ti.API.info('fusion query '+"SELECT * FROM "+fusionTableId);
						Ti.API.info('before');

		ar.google.fusion.query({
			sql: "SELECT * FROM "+fusionTableId,
			success: function(result) {
				var db = ar.db.openDatabase();
				for (var i = 0; i < result.rowSize(); i++) {
					var sql = 'DELETE FROM '+tableName + ' WHERE '+id+' = \''+result.getValue(i,id)+'\'';
					db.execute(sql);
					var columnsList = [id, radius, lat, lng, timeDelta, name, description, type, payload];
					var columnsString = ar.db.columnNamesToSQL(columnsList);
					var valuesString = ar.db.ValuesToSQL(columnsList);
					sql = 'INSERT INTO '+tableName+ columnsString+' VALUES '+valuesString;
					db.execute(sql, result.getValue(i,id), result.getValue(i,radius),
					result.getValue(i,'location').getLatFromFusion(), result.getValue(i,'location').getLngFromFusion(),
					result.getValue(i,timeDelta),
					result.getValue(i,name),result.getValue(i,description),result.getValue(i,type),result.getValue(i,payload));
					
				}
				db.close();

			}
		});
	}

	ar.db.generalItem.fusionUpdate = function(args) {
		Ti.API.info('generalItem update');
		// Ti.API.info('generalItem update');
		var gameData = ar.db.gameData.getGameData();
		for (key in gameData) {
			var oneGameData = gameData[key];
			loadGeneralItemTable(oneGameData.tableid, updateLocalDbFromFusion, key);
		}
	}
	ar.db.generalItem.getGeneralItems = function() {
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
				returnObject[rowid] [radius] = rows.fieldByName(radius);
				returnObject[rowid] [lat] = rows.fieldByName(lat);
				returnObject[rowid] [lng] = rows.fieldByName(lng);
				returnObject[rowid] [timeDelta] = rows.fieldByName(timeDelta);
				returnObject[rowid] [name] = rows.fieldByName(name);
				returnObject[rowid] [description] = rows.fieldByName(description);
				returnObject[rowid] [type] = rows.fieldByName(type);
				returnObject[rowid] [payload] = rows.fieldByName(payload);
			}
		} while (rows.next())
		rows.close();
		db.close();
		return returnObject;
	}
})();