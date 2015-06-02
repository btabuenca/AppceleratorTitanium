(function() {
	
	ouClicker.ui.getAvailableWindow = function () {

		// create tab group
		var tabGroup = Titanium.UI.createTabGroup({
			id:'tabGroup1'
		});

		var winAvailable = Titanium.UI.createWindow({
			className:'winAvailable',
			title:'CELSTEC clicker ',
			backgroundColor:'#13386c',
			barColor:'#13386c'
		});

		var tab1 = Titanium.UI.createTab({
			titleid:'Open University of the Netherlands',
			window:winAvailable
		});
		tabGroup.addTab(tab1);
		tabGroup.addEventListener('open', function() {
			// set background color back to white after tab group transition
			Titanium.UI.setBackgroundColor('#fff');
		});
		tabGroup.setActiveTab(1);
		// open tab group with a transition animation
		tabGroup.open({
			transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});

		var mainLabel = Titanium.UI.createLabel({
			color:'#fff',
			text:'These are the available questions within your scope',
			top:10,
			left:30,
			width:'auto',
			height:'auto'
		});

		winAvailable.add(mainLabel);

		var send = Titanium.UI.createButton({
			title:'Go!',
			top:320,
			height:30,
			width:100
		});
		winAvailable.add(send);

		var picker = Ti.UI.createPicker();
		var selectedItem = "";
		var data = [];

		ouClicker.location.getLocation( function(currentCity) {
			// Data has been read from DB so it can be used now
			//Ti.API.debug("callback called! with result:" + currentCity);

			var sqlSentence = "SELECT 'questionnaireId', 'description', 'blocked', 'password' FROM "+ouClicker.google.table.questionnaire+" WHERE location LIKE '"+currentCity+"'";
			//Ti.API.debug(sqlSentence);

			ouClicker.google.fusion.query({
				sql: sqlSentence,
				success: function(result) {

					//Ti.API.debug("The JSON: >"+JSON.stringify(result.getJSON())+"<");

					// Fill picker with json data
					ouClicker.utils.fillPicker(result.getJSON(), picker, function(newPicker) {
						ouClicker.utils.initData(result.getJSON(), function() {
						});
						winAvailable.add(newPicker);
					});
				}
			});
		});
		picker.addEventListener('change', function(e) {
			//Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
			//Ti.API.info("Row index: "+e.rowIndex+", column index: "+e.columnIndex);
			//Ti.API.info(">>custom_item: "+e.row.custom_item);
			selectedItem = e.row.custom_item;

			var indPipe1 = e.row.custom_item.indexOf('|');
			var indPipe2 = e.row.custom_item.indexOf('|', indPipe1+1);
			ouClicker.data.questionId = e.row.custom_item.substring(0, indPipe1);
			ouClicker.data.blocked = e.row.custom_item.substring(indPipe1+1, indPipe2);
			ouClicker.data.password = e.row.custom_item.substring(indPipe2+1, e.row.custom_item.length);
			Ti.API.info(">>questionId: ["+ouClicker.data.questionId+"], blocked: ["+ouClicker.data.blocked+"], password: ["+ouClicker.data.password+"]");

		});
		send.addEventListener('click', function(e) {

			// Pass selection as parameter
			//Ti.API.debug("questionId: "+ouClicker.data.questionId+", blocked: "+ouClicker.data.blocked);
			winAvailable.close();

			if (ouClicker.data.blocked == 1) {
				ouClicker.ui.getLoginWindow().open();
			} else {
				ouClicker.ui.getQuestionWindow().open();
			};

		});
		return winAvailable;
	}
})();