app = {};

// Include files
Ti.include("./app/model/MyModel.js");
Ti.include("./app/controller/MyController.js");
Ti.include("./app/view/MyView.js");

Ti.API.debug("Starting clicker ...");

// Init model view controller
var myModel = new app.model.MyModel();
var myView = new app.view.MyView();
var myController = new app.controller.MyController();

// Start app
myController.startWindow();

