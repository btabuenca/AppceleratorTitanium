app.model.db.gfusion.authentication = {};

(function() {

	// *************************************
	// Init variables
	// *************************************
	var auth = '';
	
	var config = {
		accountType: 'HOSTED_OR_GOOGLE',
		Email : '',
		Passwd : '',
		'Content-Type': "application/x-www-form-urlencoded",
		service        : 'fusiontables'
	}
	
  	var googleUrl = 'https://www.google.com';
	
	// *************************************
	// Private methods
	// *************************************
	function parseError(body) {
		var result = {}
		var matches = body.split('\n');
		if (matches) {
			for (var i =0; i < matches.length; i++) {
				var matches1 = matches[i].split('=');
				if (matches1[0] != '' ) result[matches1[0]]	= matches1[1]
			}
		}
		return result;
	}
	
	function init(args) {
		if (args.accountType) config.accountType = args.accountType;
		if (args.service) config.service = args.service;
		if (args.accountType) config.accountType = args.accountType;
		if (args.Email) config.Email = args.Email;
		if (args.Passwd) config.Passwd = args.Passwd;
	}

	// *************************************
	// Public methods
	// *************************************
	app.model.db.gfusion.authentication.login = function login(args) {		
		init (args)
		var httpclient = Titanium.Network.createHTTPClient();		
		Ti.API.debug("httpclient.open ["+googleUrl+"/accounts/ClientLogin]");
		httpclient.open('POST', googleUrl+'/accounts/ClientLogin');
		httpclient.onload = function() {
			var body = this.responseText;
			Ti.API.debug("this.responseText ["+this.responseText+"]");
			var matches = body.match(/Auth=(.*)/);
			if (!matches) {		
				if (args.error) {					
					var errors = parseError(body)
					errors.body = body;
					args.error(errors);
				}
						
			} else {				
				var results = matches[0].split('Auth=');
				auth = results[1];
				
					if (args.success)
						if(this.status===200) {
							args.success({auth: auth});					
						}
			}
		};		
		httpclient.send(config);
	}
	
	app.model.db.gfusion.authentication.getAuthToken = function getAuthToken() {
		return auth;
	}
	
})();

