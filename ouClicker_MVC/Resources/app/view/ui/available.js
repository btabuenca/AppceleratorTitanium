app.view.ui.available = {};

// Self invoking function
(function() {

	app.view.ui.getAvailableWindow = function () {

		//
		// TODO Include link to login
		//
		// var fileLoginImg = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/login_32x32.png');
		var winAvailable = Titanium.UI.createWindow({
			className:'winAvailable',
			title:'Clicker',
			backgroundColor:'#13386c',
			barColor:'#13386c'
		});
		
		
		// Login button
		var b = Titanium.UI.createButton({title:'Login'});
		winAvailable.rightNavButton = b;		

		//
		// Create search bar
		//
		var search = Titanium.UI.createSearchBar({
			barColor:'#385292',
			showCancel:false
		});
		search.addEventListener('change', function(e) {
			e.value; // search string as questionDesc types
		});
		search.addEventListener('return', function(e) {
			search.blur();
		});
		search.addEventListener('cancel', function(e) {
			search.blur();
		});
		//
		// Create table view
		//
		var tableView;
		tableView = Titanium.UI.createTableView({
			search:search,
			scrollable:true,
			filterAttribute:'filter',
			backgroundColor:'white'
		});

		//
		// Read data from database
		//
		var arrayItems;

		myController.getQuestions( function(items) {
			//
			// Build rows from the table
			//
			var data = [];
			for (var c=0;c<items.length;c++) {

				var row = Ti.UI.createTableViewRow();
				row.selectedBackgroundColor = '#fff';
				row.height = 75;
				row.className = 'datarow';
				row.clickName = 'row';

				var questionDesc = Ti.UI.createLabel({
					color:'#576996',
					font: {
						fontSize:16,
						fontWeight:'bold',
						fontFamily:'Arial'
					},
					left:70,
					top:2,
					height:30,
					width:200,
					text:items[c]['questionDesc']
				});

				row.filter = questionDesc.text;
				row.add(questionDesc);

				var fontSize = 16;
				if (Titanium.Platform.name == 'android') {
					fontSize = 14;
				}
				var comment = Ti.UI.createLabel({
					color:'#222',
					font: {
						fontSize:fontSize,
						fontWeight:'normal',
						fontFamily:'Arial'
					},
					left:70,
					top:20,
					height:30,
					width:200,
					text:items[c]['questionAuthorId']
				});
				row.add(comment);

				var pwd = items[c]['questionPassword'];
				if(pwd.length > 0){
					var keyImage = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/key.png');
					var keyImageView = Titanium.UI.createImageView({
						image:keyImage,
						left:35,
						width:32,
						height:32,
						top:5
					});	
					row.add(keyImageView);					
				}
				
				var f = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/eventsButton.png');
				var imageView = Titanium.UI.createImageView({
					image:f,
					left:70,
					width:32,
					height:32,
					top:40
				});	
				row.add(imageView);
				
				var date = Ti.UI.createLabel({
					color:'#999',
					font:{fontSize:13,fontWeight:'normal', fontFamily:'Arial'},
					left:105,
					top:40,
					height:20,
					width:150,
					text:items[c]['questionDate']
				});
				row.add(date);				
				
				
				// Images to be shown depending on user profile				
				if (items[c]['questionAuthorId'] == myModel.getUserId()) {
					
				
					var fileEditImg = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/icon_editQuest_32x32.png');
					var imageViewEdit = Titanium.UI.createImageView({
						image:fileEditImg,
						left:3,
						width:32,
						height:32,
						top:40
					});	
					row.add(imageViewEdit);
					
					var fileDelImg = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/icon_delQuest2_32x32.png');
					var imageViewDel = Titanium.UI.createImageView({
						image:fileDelImg,
						left:35,
						width:32,
						height:32,
						top:40
					});	
					row.add(imageViewDel);
									
					var fileStatsImg = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/icon_statsQuest_32x32.png');
					var imageViewStats = Titanium.UI.createImageView({
						image:fileStatsImg,
						left:280,
						width:32,
						height:32,
						top:40
					});	
					row.add(imageViewStats);
								
									
				};

				
				
				
				data.push(row);
			}
			arrayItems = items;
			tableView.data = data;
			winAvailable.add(tableView);

		}
		);

		tableView.addEventListener('click', function(e) {
			//
			// Save selection data
			//
			myModel.setSelectedQuestionnaire(arrayItems[e.index]);

			//
			// Open window depending on if the question is blocked with login
			//
			//winAvailable.close();
			var isBlocked = arrayItems[e.index]['questionPassword'];
			myController.availableForward(isBlocked);

		});
		return winAvailable;
	}
})();