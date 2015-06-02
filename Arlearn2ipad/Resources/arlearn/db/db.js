(function() {
	var databaseName = 'ARLearn';

	ar.db = {};

	ar.db.INT = 'INTEGER';
	ar.db.TXT = 'TEXT';
	ar.db.DOUBLE = 'DOUBLE';

	ar.db.init = {};
	ar.db.drop = {};

	function extractColumnString(columns) {
		var columnString = '';
		for (var key in columns) {
			columnString += ', '+key +' '+columns[key];
		}
		return columnString.removeFirstCharacter(',').trim();
	}

	ar.db.openDatabase = function() {
		return Titanium.Database.open(databaseName);
	}
	ar.db.createTable = function(tableName, columns) {
		var db = ar.db.openDatabase();
		var sql = 'CREATE TABLE IF NOT EXISTS '+tableName+'  ('+extractColumnString(columns)+')';
		db.execute(sql);
		db.close();
	}
	ar.db.emptyTable = function(tableName) {
		var db = ar.db.openDatabase();
		var sql = 'DELETE FROM '+tableName;
		db.execute(sql);
		db.close();
	}
	ar.db.dropTable = function(tableName) {
		var db = ar.db.openDatabase();
		db.execute("DROP TABLE "+tableName);
		db.close();
	}
	ar.db.initAllTables = function() {
		ar.db.init.authTable();
		ar.db.init.gameDataTable();
		ar.db.init.generalItemTable();
		ar.db.init.myGamesTable();
	}
	ar.db.dropAllTables = function() {
		ar.db.drop.authTable();
		ar.db.drop.gameDataTable();
		ar.db.drop.generalItemTable();
		ar.db.drop.myGamesTable();
	}
	ar.db.updateFromFusion = function() {
		
	}
	
})();

Ti.include(
'/arlearn/db/authentication.js',
'/arlearn/db/gamedata.js',
'/arlearn/db/generalitem.js',
'/arlearn/db/mygames.js'
);