(function() {
	var tableName = 'authentication';
	var Username = 'Username';
	var Token = 'Token';

	ar.db.init.authTable = function() {
		ar.db.createTable(
		tableName, {
			Username: ar.db.TXT,
			Token: ar.db.TXT
		});
	}
	ar.db.drop.authTable = function() {
		ar.db.dropTable(tableName);
	}
	ar.db.getAuthToken = function () {
		var db = ar.db.openDatabase();
		var sql = 'SELECT * FROM '+ tableName ;
		var rows = db.execute(sql);
		if (rows.rowCount == 0)
			return '';
		var returnToken = rows.fieldByName(Token);
		rows.close();
		db.close();
		return returnToken;
	};
	ar.db.storeAuthToken = function (token, username) {
		var db = ar.db.openDatabase();
		var sql = 'DELETE FROM '+tableName;
		db.execute(sql);
		var sql = 'INSERT INTO '+tableName+' ('+Username+', '+Token+') VALUES(\''+username+'\',\''+token+'\')';
		db.execute(sql);
		db.close();
	};
	ar.db.getUsername = function () {
		var db = ar.db.openDatabase();
		var sql = 'SELECT * FROM '+ tableName ;
		var rows = db.execute(sql);
		if (rows.rowCount == 0)
			return '';
		var returnUsername = rows.fieldByName(Username);
		rows.close();
		db.close();
		return returnUsername;
	};
	
	ar.db.afterAuthenticationTasks = function() {
		var taskChain = ar.app.createTaskChain();
		taskChain.addTask(ar.db.generalItem.fusionUpdate, {});
		taskChain.addTask(ar.db.gameData.fusionUpdate, {});
		taskChain.addTask(ar.db.myGames.fusionUpdate, {});
		taskChain.addTask(ar.db.myGames.setMyGamesTableId, {});
		taskChain.start();
	}
})();