app.model.location = {};

app.model.location.getCity = function (callback) {
	
	
	Ti.Geolocation.preferredProvider = "gps";
	Ti.Geolocation.purpose = "GPS demo";

	if (Titanium.Geolocation.locationServicesEnabled === false){
		Titanium.UI.createAlertDialog({title:'Clicker', message:'Your device has geo turned off - turn it on.'}).show();
	}
	
	function translateErrorCode(code) {
		if (code == null) {
			return null;
		}
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	}

	var locationCallback = function(e) {

		if (!e.success || e.error) {
			Ti.API.info("Translation error. ["+e.success+"]. ["+e.error+"]");
			return;
		}

		// Reverse geo
		Titanium.Geolocation.reverseGeocoder(e.coords.latitude,e.coords.longitude, function(evt) {
			if (evt.success) {
				Ti.API.debug("Reverse geolocation result = "+JSON.stringify(evt));
				callback(evt.places[0].city);
			} else {
				Ti.API.info("Code translation error: "+translateErrorCode(e.code));
			}
		});
		Titanium.API.info('Geo - location updated: ' + new Date(e.coords.timestamp) + ' long ' + e.coords.longitude + ' lat ' + e.coords.latitude + ' accuracy ' + e.coords.accuracy);

	};
	Titanium.Geolocation.addEventListener('location', locationCallback);

}

