app.view.ui.question = {};


// Self invoking function
(function() {

	app.view.ui.getQuestionWindow = function () {

		var winQuestion = Titanium.UI.createWindow({
			className:'winQuestion',
			title:myModel.getQuestionnaireLongDescription(),
			backgroundColor:'#bbbbbb',
			barColor:'#13386c'
		});
		
		
// View		
var questionnaireDescriptionWrap = Ti.UI.createView({ 
	backgroundColor: '#fff', 
	borderRadius: 12, 
	height: 'auto', 
	width: 300, 
	top: 10 
});


// Elements in view

var questionnaireDescription = Ti.UI.createLabel({ 
	text: myModel.getQuestionnaireDescription(), 
					color:'#000000',
					font: {
						fontSize:16,
						fontWeight:'bold',
						fontFamily:'Arial'
					},
	width: 280, 
	height:'auto', 
	top: 10 
});

var limitLabel = Ti.UI.createLabel({ 
	text: '', 
	height:'auto', 
	top: 80 
});




 
questionnaireDescriptionWrap.add(questionnaireDescription);
questionnaireDescriptionWrap.add(limitLabel);


winQuestion.add(questionnaireDescriptionWrap);
		



		//
		// Read data from database
		//
		//var items = myController.getQuestions();
		var arrayItems;

		myController.getOptions( function(items) {
			
			//
			// Build rows from the table
			//
			var data = [];
			for (var c=0;c<items.length;c++) {

				var row = Ti.UI.createTableViewRow();
				row.selectedBackgroundColor = '#fff';
				row.height = 35;
				row.className = 'datarow';

				var optionDesc = Ti.UI.createLabel({
					color:'#576996',
					font: {
						fontSize:16,
						fontWeight:'bold',
						fontFamily:'Arial'
					},
					top:2,
					height:30,
					textAlign:'center',
					text:items[c]['optionDesc']
				});

				row.filter = optionDesc.text;
				row.add(optionDesc);

				data.push(row);
			}
			arrayItems = items;
			tableview.data = data;
			
					
			
			
			winQuestion.add(tableview);

		});
		
		
		//
		// TODO Depending on questions length, the option
		//  table covers the question label
		//  Update tableViewOptions depending on  questions's length


		// TODO do no use iPhone things because first version will be android based

		// create table view
		var tableViewOptions = {
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			top:110,
			backgroundColor:'transparent',
			rowBackgroundColor:'white'
		};

		var tableview = Titanium.UI.createTableView(tableViewOptions);
			

		// create table view event listener
		tableview.addEventListener('click', function(e) {

			//
			// Save selection in data model
			//
			myModel.setSelectedOption(arrayItems[e.index]);

			//
			// Open window depending on if the question is blocked with login
			//
			myController.saveAnswer();
			winQuestion.close();
			myController.startWindow();						

			
		});
				
		
		return winQuestion;
	}
})();