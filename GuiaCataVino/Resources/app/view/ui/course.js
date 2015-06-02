app.view.ui.main = {};

// Self invoking function
(function() {

	app.view.ui.getCourseWindow = function () {

		//
		// TODO Include link to login
		//
		// var fileLoginImg = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/login_32x32.png');
		var winMain = Titanium.UI.createWindow({
			className:'winMain',
			title:'Curso de cata',
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
			
			
			// Start row fase visual

				var rowFaseVisual = Ti.UI.createTableViewRow();
				rowFaseVisual.selectedBackgroundColor = '#fff';
				rowFaseVisual.height = 100;
				rowFaseVisual.className = 'datarow';
				rowFaseVisual.clickName = 'row';


				var fvImage = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/fase_visual_200x200.png');
				var fvImageView = Titanium.UI.createImageView({
						image:fvImage,
						left:5,
						width:100,
						height:100,
						top:2
				});	
				rowFaseVisual.add(fvImageView);					


				var labelFaseVisual = Ti.UI.createLabel({
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
					text:'Fase visual'
				});

				rowFaseVisual.filter = labelFaseVisual.text;
				rowFaseVisual.add(labelFaseVisual);

				var fontSize = 16;
				if (Titanium.Platform.name == 'android') {
					fontSize = 14;
				}
				var commentFaseVisual = Ti.UI.createLabel({
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
					text:'En la fase visual se valoran la limpidez, los matices de color, la presencia de gas carbónico y la fluidez del vino.'
				});
				rowFaseVisual.add(commentFaseVisual);

				// End row
							
			// Start row fase olfativa

				var rowFaseOlfativa = Ti.UI.createTableViewRow();
				rowFaseOlfativa.selectedBackgroundColor = '#fff';
				rowFaseOlfativa.height = 100;
				rowFaseOlfativa.className = 'datarow';
				rowFaseOlfativa.clickName = 'row';


				var foImage = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/fase_olfativa_200x200.png');
				var foImageView = Titanium.UI.createImageView({
						image:foImage,
						left:5,
						width:100,
						height:100,
						top:2
				});	
				rowFaseOlfativa.add(foImageView);					


				var labelFaseOlfativa = Ti.UI.createLabel({
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
					text:'Fase olfativa'
				});

				rowFaseOlfativa.filter = labelFaseOlfativa.text;
				rowFaseOlfativa.add(labelFaseOlfativa);

				var fontSize = 16;
				if (Titanium.Platform.name == 'android') {
					fontSize = 14;
				}
				var commentFaseOlfativa = Ti.UI.createLabel({
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
					text:'En la fase visual se valoran la limpidez, los matices de color, la presencia de gas carbónico y la fluidez del vino.'
				});
				rowFaseOlfativa.add(commentFaseOlfativa);

				// End row

			// Start row fase gustativa

				var rowFaseGustativa = Ti.UI.createTableViewRow();
				rowFaseGustativa.selectedBackgroundColor = '#fff';
				rowFaseGustativa.height = 100;
				rowFaseGustativa.className = 'datarow';
				rowFaseGustativa.clickName = 'row';


				var fgImage = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/fase_gustativa_200x200.png');
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
					text:'Fase gustativa'
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
					text:'En la fase gustativa se valoran la limpidez, los matices de color, la presencia de gas carbónico y la fluidez del vino.'
				});
				rowFaseGustativa.add(commentFaseGustativa);

				// End row				
				
				data.push(rowFaseVisual);
				data.push(rowFaseGustativa);
				data.push(rowFaseOlfativa);

			
			//arrayItems = items;
			tableView.data = data;
			winMain.add(tableView);

		tableView.addEventListener('click', function(e) {

			myController.mainForward(e.index);

		});
		
		
		return winMain;
	}
})();