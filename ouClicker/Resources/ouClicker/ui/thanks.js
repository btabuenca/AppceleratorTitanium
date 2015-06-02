(function() {
	ouClicker.ui.getThanksWindow = function () {

		var win = Titanium.UI.createWindow({
			title: 'Save data',
			backgroundColor:'#fff',
			barColor:'#111'
		});
		win.backgroundColor = '#13386c';
		win.barColor = '#13386c';

		var firstName = Titanium.UI.createLabel({
			color:'#fff',
			text:'Thanks! Data has been stored successfully.',
			left:10,
			top:100,
			height:'auto'
		});

		win.add(firstName);

		var save = Titanium.UI.createButton({
			title:'Close',
			top:400,
			height:30,
			width:100
		});
		win.add(save);

		save.addEventListener('click', function(e) {

			win.close();
			ouClicker.ui.getAvailableWindow().open();

		});
		return win;
	}
})();