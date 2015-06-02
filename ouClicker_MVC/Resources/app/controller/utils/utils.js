app.controller.utils = {};

(function() {

	//
	// Receive json data
	// return array with the same data
	//	
	app.controller.utils.parseJson = function (json, callback) {

		var i = 0;
		var items = new Array(json.table.rows.length);

		Ti.API.debug("JSON has  ["+json.table.rows.length+"] rows");

		while (i<=json.table.rows.length-1) {

			//Ti.API.debug(" NEW RECORD. Number of cols:"+json.table.cols.length);
			var j = 0;
			items[i]=new Array(json.table.cols.length);
			while (j<=json.table.cols.length-1) {
				Ti.API.debug(" - col "+j+" :"+json.table.cols[j] + " value:"+json.table.rows[i][j]);
				var colDesc = json.table.cols[j];
				items[i][colDesc] = json.table.rows[i][j];

				j++;
			}
			i++;
		}

		callback(items);
	}
})();