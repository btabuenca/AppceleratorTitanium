(function() {
	ouClicker.utils = {};

	ouClicker.utils.fillPicker = function (json, picker, callback) {

		//Ti.API.debug("ouClicker.location.getLocation params: ["+json+"]["+picker+"]");
		//Ti.API.debug("ouClicker.utils.fillPicker params. json ["+json+"]");

		var data = [];

		// Empty picker
		if(picker.columns[0]) {

			// This code will not be executed when picker is already empty
			var _col = picker.columns[0];
			var len = _col.rowCount;

			for(var x = len-1; x >= 0; x-- ) {
				var _row = _col.rows[x]
				_col.removeRow(_row);
			}
			picker.reloadColumn(_col);
		}

		var i = 0;
		while (i<=json.table.rows.length-1) {

			var s = JSON.stringify(json.table.rows[i]);
			// [8,"Chiba 1.01",0,"passw"]
			var ind1 = s.indexOf(',');
			var ind2 = s.indexOf(',', ind1+1);
			var ind3 = s.indexOf(',', ind2+1);
			Ti.API.debug(" Row:"+s+" Ind1:"+ind1+" Ind2:"+ind2+" Ind3:"+ind3);

			var key = s.substring(1, ind1);
			var desc = s.substring(ind1+2, ind2-1);
			var blocked = s.substring(ind2+1, ind3);
			var password = s.substring(ind3+2, s.length-2);
			Ti.API.debug(" key:"+key+" desc:"+desc+" blocked:"+blocked+" passw:"+password);

			var sRow = "{title:'"+desc+"',custom_item:'"+key+"|"+blocked+"|"+password+"'}";
			var myJSONThing = eval('(' + sRow + ')');
			data[i]=Ti.UI.createPickerRow(myJSONThing);

			i++;
		}

		picker.selectionIndicator = true;
		picker.add(data);

		//Ti.API.debug("ouClicker.controls.fillPicker ended");

		callback(picker);
	}
	
	// Inits "available questions data" filling with the values from the first 
	// item of the picker 
	ouClicker.utils.initData = function (json, callback) {

		//Ti.API.debug("ouClicker.location.getLocation params: ["+json+"]["+picker+"]");
		//Ti.API.debug("ouClicker.utils.fillPicker params. json ["+json+"]");

		var s = JSON.stringify(json.table.rows[0]);
		// [8,"Chiba 1.01",0,"passw"]
		var ind1 = s.indexOf(',');
		var ind2 = s.indexOf(',', ind1+1);
		var ind3 = s.indexOf(',', ind2+1);
		//Ti.API.debug(" INITPICKER json:"+s+" Ind1:"+ind1+" Ind2:"+ind2+" Ind3:"+ind3);

		ouClicker.data.questionId = s.substring(1, ind1);
		ouClicker.data.blocked = s.substring(ind2+1, ind3);
		ouClicker.data.password = s.substring(ind3+2, s.length-2);
		//Ti.API.debug(" INITPICKER id:"+ouClicker.data.questionId+" blocked:"+ouClicker.data.blocked+" password:"+ouClicker.data.password);

		callback();
	}
	
	
	// Inits "answer data" filling with default values depending on question type
	//  That is, boolean, multiple value or single value
	ouClicker.utils.initAnswerData = function (qType) {

		if(qType == 1){
			// Boolean
			ouClicker.data.answer = false;
		}if(qType == 2){
			// Multiple value
			ouClicker.data.answer = 0;
		}if(qType == 3){
			// Single value
			ouClicker.data.answer = 0;			
		}
	}	
	
	// Info necessary to build question screen depending on json
	// and returning the question text, and suitable control
	ouClicker.utils.getControl = function (result, callback) {

		var myObject = result.getJSON();
		var text = JSON.stringify(myObject.table.rows[0]);

		// ["Which mobile devices do you use most?",2,"Smartphone","0",0]
		var ind0 = text.indexOf(',');
		var ind1 = text.indexOf(',', ind0+1);
		var ind2 = text.indexOf(',', ind1+1);
		var ind3 = text.indexOf(',', ind2+1);
		/*
		 Ti.API.debug("ind0["+ind0+"]");
		 Ti.API.debug("ind1["+ind1+"]");
		 Ti.API.debug("ind2["+ind2+"]");
		 Ti.API.debug("ind3["+ind3+"]");
		 */

		var questionText = text.substring(2, ind0-1);
		var questionTypeId = text.substring(ind0+1, ind1);
		var optionDesc = text.substring(ind1+2, ind2-1);
		var optionValue = text.substring(ind2+2, ind3-1);
		var order = text.substring(ind3+1, text.length-1);
		/*
		 Ti.API.debug(" questionText ["+questionText+"]");
		 Ti.API.debug(" questionTypeId ["+questionTypeId+"]");
		 Ti.API.debug(" optionDesc ["+optionDesc+"]");
		 Ti.API.debug(" optionValue ["+optionValue+"]");
		 Ti.API.debug(" order ["+order+"]");
		 Ti.API.debug(" num elems ["+myObject.table.rows.length+"]");
		 */

		var control;
		var questionText;

		if (questionTypeId == 1) {
			// Boolean
			control = ouClicker.utils.getSwitch;
			questionText = questionText;

		} else if(questionTypeId == 2) {
			// Multiple value

			control = ouClicker.utils.getCombo;
			
			// TODO. When multiple option question is selected more than once, it adds
			// the values repeating them in the combo. Shuould be fixed if it is a 
			// realistic scenario.
			
			control.selectionIndicator = true;
			var data = [];

			for(i=0;i<myObject.table.rows.length;i++) {

				text = JSON.stringify(myObject.table.rows[i]);

				Ti.API.debug("row "+i+"["+text+"]");

				// ["Which mobile devices do you use most?",2,"Smartphone","0",0]
				ind0 = text.indexOf(',');
				ind1 = text.indexOf(',', ind0+1);
				ind2 = text.indexOf(',', ind1+1);
				ind3 = text.indexOf(',', ind2+1);

				questionText = text.substring(2, ind0-1);
				questionTypeId = text.substring(ind0+1, ind1);
				optionDesc = text.substring(ind1+2, ind2-1);
				optionValue = text.substring(ind2+2, ind3-1);
				order = text.substring(ind3+1, text.length-1);
				/*
				 Ti.API.debug(" questionText ["+questionText+"]");
				 Ti.API.debug(" questionTypeId ["+questionTypeId+"]");
				 Ti.API.debug(" optionDesc ["+optionDesc+"]");
				 Ti.API.debug(" optionValue ["+optionValue+"]");
				 Ti.API.debug(" order ["+order+"]");
				 //Ti.API.debug(" num elems ["+myObject.table.rows.length+"]");
				 */
				var sRow = "{title:'"+optionDesc+"',custom_item:'"+optionValue+"'}";
				var myJSONThing = eval('(' + sRow + ')');
				data[i]=Ti.UI.createPickerRow(myJSONThing);

			}
			control.add(data);

			questionText = questionText;

		} else if(questionTypeId == 3) {
			// Single value

			control = ouClicker.utils.getTextField;
			questionText = questionText;

		}

		callback(questionText, questionTypeId, control);
	}
	
	
	// Switch control
	ouClicker.utils.getSwitch = Titanium.UI.createSwitch({
		value:false
	});
	ouClicker.utils.getSwitch.addEventListener('change', function(e) {
		ouClicker.data.answer = e.value;
	});
	
	
	// Text field control
	ouClicker.utils.getTextField = Titanium.UI.createTextField({
		hintText:'Answer here',
		value: '',
		height:35,
		top:100,
		left:30,
		width:250,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	ouClicker.utils.getTextField.addEventListener('change', function(e) {
		ouClicker.data.answer = e.value;
	});
	
	
	// Combo box
	ouClicker.utils.getCombo = Ti.UI.createPicker();
	ouClicker.utils.getCombo.addEventListener('change', function(e) {
		ouClicker.data.answer = e.row.custom_item;
	});
})();