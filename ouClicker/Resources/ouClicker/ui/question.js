(function() {
	ouClicker.ui.getQuestionWindow = function () {

		var win = Titanium.UI.createWindow({
			title: 'Question window',
			backgroundColor:'#fff',
			barColor:'#111'
		});
		win.backgroundColor = '#13386c';
		win.barColor = '#13386c';

		var question = Titanium.UI.createLabel({
			color:'#fff',
			text:'How many hours do you spend using you mobile phone in a day?',
			left:10,
			top:10,
			height:'auto'
		});

		var sqlSentence = "SELECT 'question', 'questionTypeId', 'optionDesc', 'optionValue', 'order' FROM "+ouClicker.google.table.questionsOptions+" WHERE questionId = "+ouClicker.data.questionId+" ORDER BY 'order'";
		//alert(sqlSentence);
		ouClicker.google.fusion.query({
			sql: sqlSentence,
			success: function(result) {
				ouClicker.utils.getControl(result, function(questionText, questionType, newControl) {
					question.text = questionText;
					win.add(question);
					ouClicker.data.questionType = questionType;
					ouClicker.utils.initAnswerData(questionType);
					win.add(newControl);
				});

			}
		});

		var save = Titanium.UI.createButton({
			title:'Go!',
			top:400,
			height:30,
			width:100
		});
		win.add(save);

		save.addEventListener('click', function(e) {
			ouClicker.google.login({
				service : 'fusiontables',
				Email : 'tutor.uah',
				Passwd : 'cimbel77',
				success: function(result) {

					var sqlSentence = "INSERT INTO "+ouClicker.google.table.answers+" ('questionId', 'answer', 'personId', 'date') VALUES ('"+
					ouClicker.data.questionId+"', '"+ouClicker.data.answer+"', 'personx','"+new Date()+"')";

					//alert(sqlSentence);
					Ti.API.info(" Insert sentence:"+sqlSentence);

					ouClicker.google.fusion.insert({
						sql: sqlSentence,
						success: function(result) {

							//alert("Data was succesfully stored!");
							Ti.API.info("Data was successfully stored!");
						}
					});

				}
			});

			win.close();
			ouClicker.ui.getThanksWindow().open();

		});
		return win;
	}
})();