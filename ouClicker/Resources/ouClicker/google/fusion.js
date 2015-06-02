(function() {
	ouClicker.google.fusion = {};
	var googleUrl = 'https://www.google.com';

	function invokeService(args, httpMethod, urlPostfix) {

		Ti.API.debug(" args.auth in:["+args.auth+"]");

		if (!args.auth) {
			args.auth = ouClicker.google.getAuthToken();
			Ti.API.debug(" args.auth out:["+args.auth+"]");
		}

		//Ti.API.debug('Opening: '+googleUrl+'/fusiontables/api/query?sql='+urlPostfix+'&jsonCallback=ouClicker.google.jsonCallback');
		//Ti.API.debug('Opening: GoogleLogin auth='+args.auth);

		var httpclient = Titanium.Network.createHTTPClient();
		httpclient.open(httpMethod, googleUrl+'/fusiontables/api/query?sql='+urlPostfix+'&jsonCallback=ouClicker.google.jsonCallback');
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


	ouClicker.google.fusion.query = function(args) {
		setSuccesMethod(args, ouClicker.model.getTable);
		invokeService(args, 'GET', args.sql);
	}
	ouClicker.google.fusion.insert = function(args) {
		setSuccesMethod(args, ouClicker.model.getTable);
		invokeService(args, 'POST', args.sql);
	}

})();