(function() {

	function rowSize (fusionJson) {
		return fusionJson.table.rows.length;
	}
	
	function columnSize(fusionJson) {
		return fusionJson.table.cols.length;
	}
	
	function getColumnName(fusionJson, i) {
		return fusionJson.table.cols[i];
	}
	
	function getColumnIndex(fusionJson, value) {
		for (var i=0; i < fusionJson.table.cols.length; i++) {
			if (fusionJson.table.cols[i] === value) return i;
		}
		return -1;
	}
	
	function getValue(fusionJson, row, column) {
		if ((typeof column) === 'string') {
			column = getColumnIndex(fusionJson, column);
		}
		return fusionJson.table.rows[row][column];
	}

	function containsValue(fusionJson, column, value) {
		for (var i=0; i < rowSize(fusionJson); i++) {
			if (getValue(fusionJson, i, column) === value) return true;
		}
		return false;
	}
	
	function rowIdForValue(fusionJson, column, value) {
		for (var i=0; i < rowSize(fusionJson); i++) {
			if (getValue(fusionJson, i, column) === value) return i;
		}
		return -1;
	}
	
	function rowIdsForValue(fusionJson, column, value) {
		if ((typeof column) === 'string') {
			column = getColumnIndex(fusionJson, column);
		}
		var returnIds = []
		for (var i=0; i < rowSize(fusionJson); i++) {
			if (getValue(fusionJson, i, column) === value) returnIds.push(i);
		}
		return returnIds;
	}
	
	ouClicker.model.getTable = function(fusionJson, args) {
		return {
			tableid: function() {if (args) return args.tableid; return args;},
			getJSON: function() {return fusionJson},
			rowSize: function () {return rowSize(fusionJson)},
			columnSize: function () {return columnSize(fusionJson)},
			getColumnName: function (i) {return getColumnName(fusionJson, i)},
			getColumnIndex: function (value) {return getColumnIndex(fusionJson, value)},
			getValue: function (row, column) {return getValue(fusionJson, row, column)},
			containsValue: function (column, value) {return containsValue(fusionJson, column, value)},
			rowIdForValue: function (column, value) {return rowIdForValue(fusionJson, column, value)},
		}
	}	
	
})();