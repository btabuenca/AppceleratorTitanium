app.view.ui.question = {};


// Self invoking function
(function() {

	app.view.ui.getQuestionWindow = function () {
		
		var winQuestion = Titanium.UI.createWindow({
			className:'winQuestion',
			title:myModel.getQuestionnaireLongDescription(),
			backgroundColor:'#ffffff',
			barColor:'#13386c'
		});

		var buttonDone = Titanium.UI.createButton({title:'Save'});
		buttonDone.addEventListener('click', function(e) {

			Ti.API.info('Sending');
			myController.saveSlider();
			
			// TODO call to success depending on success of insert
			// Need callback var
			myController.successSlider();
			
			winQuestion.close();


		});		
		winQuestion.rightNavButton = buttonDone;	
		
		


		Ti.API.info('Setting gender to '+myModel.getQuestionnaireId());
		myModel.setSliderGender(myModel.getQuestionnaireId());


		// View		
		var scrollView = Ti.UI.createScrollView({
			contentWidth:'auto',
			contentHeight:'auto',
			top:5,
			backgroundColor:'#ffffff',
			showVerticalScrollIndicator:true,
			showHorizontalScrollIndicator:false			
		});
		
		
		// Elements in view		
		var questionnaireDescription = Ti.UI.createLabel({ 
			text: myModel.getQuestionnaireDescription(), 
							color:'#576996',
							font: {
								fontSize:16,
								fontWeight:'bold',
								fontFamily:'Arial'
							},
			width: 280, 
			height:'auto', 
			top: 5 
		});
		
/*		
		var limitLabel = Ti.UI.createLabel({ 
			text: '', 
			height:'auto', 
			top: 55 
		});
*/		
		
		//
		// Sliders
		//
		
		// One month
		var oneMonthLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			top:55,
			width:300,
			height:'auto'
		});
		
		var oneMonthSlider = Titanium.UI.createSlider({
			min:0,
			max:25,
			value:5,
			width:250,
			height:'auto',
			top:75
		});
		oneMonthSlider.addEventListener('change',function(e)
		{
			oneMonthLabel.text = Math.round(e.value) + ' partners in 1 month.';
			myModel.setSliderOneMonth(Math.round(e.value));
		});
		oneMonthSlider.value = 0;
		myModel.setSliderOneMonth(0);
		
		// Six months
		var sixMonthsLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			top:105,
			width:300,
			height:'auto'
		});
		
		var sixMonthsSlider = Titanium.UI.createSlider({
			min:0,
			max:25,
			value:5,
			width:250,
			height:'auto',
			top:125
		});
		sixMonthsSlider.addEventListener('change',function(e)
		{
			sixMonthsLabel.text = Math.round(e.value) + ' partners in 6 months.';
			myModel.setSliderSixMonths(Math.round(e.value));
		});
		sixMonthsSlider.value = 0;
		myModel.setSliderSixMonths(0);


		// One year
		var oneYearLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			top:155,
			width:300,
			height:'auto'
		});
		
		var oneYearSlider = Titanium.UI.createSlider({
			min:0,
			max:25,
			value:5,
			width:250,
			height:'auto',
			top:175
		});
		oneYearSlider.addEventListener('change',function(e)
		{
			oneYearLabel.text = Math.round(e.value) + ' partners in 1 year.';
			myModel.setSliderOneYear(Math.round(e.value));
		});
		oneYearSlider.value = 0;
		myModel.setSliderOneYear(0);


		// Five years
		var fiveYearsLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			top:205,
			width:300,
			height:'auto'
		});
		
		var fiveYearsSlider = Titanium.UI.createSlider({
			min:0,
			max:25,
			value:5,
			width:250,
			height:'auto',
			top:225
		});
		fiveYearsSlider.addEventListener('change',function(e)
		{
			fiveYearsLabel.text = Math.round(e.value) + ' partners in 5 years.';
			myModel.setSliderFiveYears(Math.round(e.value));
		});
		fiveYearsSlider.value = 0;
		myModel.setSliderFiveYears(0);


		// Ten years
		var tenYearsLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			top:255,
			width:300,
			height:'auto'
		});
		
		var tenYearsSlider = Titanium.UI.createSlider({
			min:0,
			max:25,
			value:5,
			width:250,
			height:'auto',
			top:275
		});
		tenYearsSlider.addEventListener('change',function(e)
		{
			tenYearsLabel.text = Math.round(e.value) + ' partners in ten years.';
			myModel.setSliderTenYears(Math.round(e.value));
		});
		tenYearsSlider.value = 0;
		myModel.setSliderTenYears(0);


		// Whole life
		var wholeLifeLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			top:305,
			width:300,
			height:'auto'
		});
		
		var wholeLifeSlider = Titanium.UI.createSlider({
			min:0,
			max:25,
			value:5,
			width:250,
			height:'auto',
			top:325

		});
		wholeLifeSlider.addEventListener('change',function(e)
		{
			wholeLifeLabel.text = Math.round(e.value) + ' partners in your whole life.';
			myModel.setSliderWholeLife(Math.round(e.value));
		});
		wholeLifeSlider.value = 0;
		myModel.setSliderWholeLife(0);

/*		
		// Button
		var sendButton = Titanium.UI.createButton({
			title:'Send',
			height:40,
			width:200,
			top:415
		});
		sendButton.addEventListener('click', function()
		{
			Ti.API.info('Sending');
			myController.saveSlider();
			
			// TODO call to success depending on success of insert
			// Need callback var
			myController.successSlider();
			
			winQuestion.close();
				
		});	
*/			
		
		//
		// Add elements
		//
		winQuestion.add(scrollView);
		
		
		
		scrollView.add(questionnaireDescription);
		//scrollView.add(limitLabel);

		scrollView.add(oneMonthLabel);
		scrollView.add(oneMonthSlider);
		
		scrollView.add(sixMonthsLabel);
		scrollView.add(sixMonthsSlider);
		
		scrollView.add(oneYearLabel);
		scrollView.add(oneYearSlider);
		
		scrollView.add(fiveYearsLabel);
		scrollView.add(fiveYearsSlider);
		
		scrollView.add(tenYearsLabel);
		scrollView.add(tenYearsSlider);
		
		scrollView.add(wholeLifeLabel);
		scrollView.add(wholeLifeSlider);

//		scrollView.add(sendButton);


		winQuestion.add(scrollView);

		return winQuestion;
	}
})();