(function() {
	ouClicker.ui.getForbiddenWindow = function () {

		var win = Titanium.UI.createWindow({
			title: 'Forbidden window',
			backgroundColor:'#fff',
			barColor:'#111'
		});
		win.backgroundColor = '#13386c';
		win.barColor = '#13386c';

		var firstName = Titanium.UI.createLabel({
			color:'#ff0000',
			text:'Incorrect key',
			textAlign:'center',
			top:100,
			height:'auto'
		});

		win.add(firstName);

		var save = Titanium.UI.createButton({
			title:'Try once more',
			top:400,
			height:30,
			width:150
		});
		win.add(save);

		save.addEventListener('click', function(e) {

			win.close();
			ouClicker.ui.getAvailableWindow().open();

		});
		return win;
	}
})();