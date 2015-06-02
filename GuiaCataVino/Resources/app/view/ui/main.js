app.view.ui.main = {};

// Self invoking function
(function() {

	app.view.ui.getMainWindow = function () {

		//
		// TODO Include link to login
		//
		// var fileLoginImg = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/login_32x32.png');
		var winMain = Titanium.UI.createWindow({
			className:'winMain',
			title:'Baltasar gracián',
			backgroundColor:'#13386c',
			barColor:'#13386c'
		});
		
		
		// Login button
		var b = Titanium.UI.createButton({title:'Login'});
		winMain.rightNavButton = b;		

		//
		// Create search bar
		//
		var search = Titanium.UI.createSearchBar({
			barColor:'#385292',
			showCancel:false
		});
		search.addEventListener('change', function(e) {
			e.value; // search string as labelFaseVisual types
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
			// Build rows from the table
			//
			var data = [];
			
			
			// Fill wine list
			var i = 0;
/*			
			var items = new Array(6);
			
			items[0] = new Array(3);
			items[0][0] = "Expresión";
			items[0][1] = "This wine is bla bla ";
			items[0][2] = "./images/bottles/bg_expression.jpeg";


			items[1] = new Array(3);
			items[1][0] = "Garnacha";
			items[1][1] = "b";
			items[1][2] = "./images/bottles/bg_garnacha.jpeg";


			items[2] = new Array(3);
			items[2][0] = "Hielo";
			items[2][1] = "c";
			items[2][2] = "./images/bottles/bg_hielo.jpeg";

			items[3] = new Array(3);
			items[3][0] = "Red";
			items[3][1] = "a";
			items[3][2] = "./images/bottles/bg_red.jpeg";


			items[4] = new Array(3);
			items[4][0] = "Rocas";
			items[4][1] = "b";
			items[4][2] = "./images/bottles/bg_rocas.jpeg";


			items[5] = new Array(3);
			items[5][0] = "Rosé";
			items[5][1] = "c";
			items[5][2] = "./images/bottles/bg_rose.jpeg";
		
			
			var items;
			*/
			var items = collection;
			for (var i=0;i<items.length;i++) {
				

			// Start row 
			
				var rowFaseGustativa = Ti.UI.createTableViewRow();
				rowFaseGustativa.selectedBackgroundColor = '#fff';
				rowFaseGustativa.height = 100;
				rowFaseGustativa.className = 'datarow';
				rowFaseGustativa.clickName = 'row';


				var fgImage = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,items[i][2]);
				var fgImageView = Titanium.UI.createImageView({
						image:fgImage,
						left:5,
						width:100,
						height:100,
						top:2
				});	
				rowFaseGustativa.add(fgImageView);					


				var labelFaseGustativa = Ti.UI.createLabel({
					color:'#576996',
					font: {
						fontSize:16,
						fontWeight:'bold',
						fontFamily:'Arial'
					},
					left:110,
					top:2,
					height:30,
					width:200,
					text:items[i][0]
				});

				rowFaseGustativa.filter = labelFaseGustativa.text;
				rowFaseGustativa.add(labelFaseGustativa);

				var fontSize = 16;
				if (Titanium.Platform.name == 'android') {
					fontSize = 14;
				}
				var commentFaseGustativa = Ti.UI.createLabel({
					color:'#222',
					font: {
						fontSize:fontSize,
						fontWeight:'normal',
						fontFamily:'Arial'
					},
					left:110,
					top:20,
					height:30,
					width:200,
					text:items[i][1]
				});
				rowFaseGustativa.add(commentFaseGustativa);
				
				data.push(rowFaseGustativa);

				// End row	
			}

			
			//arrayItems = items;
			tableView.data = data;
			winMain.add(tableView);

		tableView.addEventListener('click', function(e) {

			// Here we have the index of the selected wine 
			// in order to evaluate it attending to 
			// what it was selected.
			app.model.session.wine.id = e.index;
			myController.mainForward();
			
			aaaaaaaaa

		});
		
		
		return winMain;
	}
})();