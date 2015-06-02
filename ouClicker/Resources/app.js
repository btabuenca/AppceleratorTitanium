Ti.include(
	'/ouClicker/clicker.js'
);

Ti.API.debug("Testing debug");

ouClicker.app.mainWindow = ouClicker.ui.getAvailableWindow();
ouClicker.app.mainWindow.open();



