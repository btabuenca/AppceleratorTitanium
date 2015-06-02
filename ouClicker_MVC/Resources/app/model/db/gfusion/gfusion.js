app.model.db.gfusion = {};

Ti.include("./constants.js");
Ti.include("./table.js");
Ti.include("./authentication.js");


(function() {
	// ********************************
	// Private methods
	// ********************************
	var googleUrl = 'https://www.google.com';

	// ********************************
	// Private methods
	// ********************************
	function invokeService(args, httpMethod, urlPostfix) {

		Ti.API.debug(" args.auth in:["+args.auth+"]");

		if (!args.auth) {
			args.auth = app.model.db.gfusion.authentication.getAuthToken();
			Ti.API.debug(" args.auth out:["+args.auth+"]");
		}

		//Ti.API.debug('Opening: '+googleUrl+'/fusiontables/api/query?sql='+urlPostfix+'&jsonCallback=ouClicker.google.jsonCallback');
		//Ti.API.debug('Opening: GoogleLogin auth='+args.auth);

		var httpclient = Titanium.Network.createHTTPClient();
		httpclient.open(httpMethod, googleUrl+'/fusiontables/api/query?sql='+urlPostfix+'&jsonCallback=app.model.db.gfusion.jsonCallback');
		httpclient.setRequestHeader('Authorization', "GoogleLogin auth="+args.auth);
		httpclient.onload = function() {
			var body = this.responseText;
			Ti.API.debug('Body: '+body);

			if (args.success)
				if(this.status===200) {
					args.success({
						body: eval(body)
					});
				}
		};
		httpclient.send();
	}

	function setSuccesMethod(args, method) {
		if (args.success) {
			oldSucces = args.success;
			args.success = function (json) {
				if (json.body)
					oldSucces(method(json.body, args));
			}
		}
	}

	// ********************************
	// Public methods
	// ********************************
	app.model.db.gfusion.query = function(args) {
		setSuccesMethod(args, app.model.db.gfusion.table.getTable);
		invokeService(args, 'GET', args.sql);
	}
	
	
	app.model.db.gfusion.insert = function(args) {
		setSuccesMethod(args, app.model.db.gfusion.table.getTable);
		invokeService(args, 'POST', args.sql);
	}
	
	
	app.model.db.gfusion.jsonCallback = function(json) {
		return json;
	}	

})();