(function() {
	ouClicker.ui.getLoginWindow = function () {

		var win = Titanium.UI.createWindow({
			title: 'Login window',
			backgroundColor:'#fff',
			barColor:'#111'
		});
		win.backgroundColor = '#13386c';
		win.barColor = '#13386c';

		var firstName = Titanium.UI.createLabel({
			color:'#fff',
			text:'Enter key',
			left:10,
			top:100,
			height:'auto'
		});

		win.add(firstName);

		var firstNameField = Titanium.UI.createTextField({
			hintText:'here...',
			value: '',
			height:35,
			top:150,
			left:30,
			width:150,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});

		win.add(firstNameField);

		var save = Titanium.UI.createButton({
			title:'Go!',
			top:400,
			height:30,
			width:100
		});
		win.add(save);

		save.addEventListener('click', function(e) {

			if (firstNameField.value == ouClicker.data.password) {
				ouClicker.ui.getQuestionWindow().open();
			} else {
				ouClicker.ui.getForbiddenWindow().open();
			};

			win.close();

		});
		return win;
	}
})();