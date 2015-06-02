(function() {

	ouClicker.location.getLocation = function (callback) {

		Ti.Geolocation.preferredProvider = "gps";

		if (isIPhone3_2_Plus()) {
			//NOTE: starting in 3.2+, you'll need to set the applications
			//purpose property for using Location services on iPhone
			Ti.Geolocation.purpose = "GPS demo";
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

		// state vars used by resume/pause
		var headingAdded = false;
		var locationAdded = false;

		//
		//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
		//
		if (Titanium.Geolocation.locationServicesEnabled === false) {
			Titanium.UI.createAlertDialog({
				title:'OU Clicker',
				message:'Your device has geo turned off - turn it on.'
			}).show();
		} else {
			if (Titanium.Platform.name != 'android') {
				var authorization = Titanium.Geolocation.locationServicesAuthorization;
				Ti.API.info('Authorization: '+authorization);
				if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
					Ti.UI.createAlertDialog({
						title:'OU Clicker',
						message:'You have disallowed Titanium from running geolocation services.'
					}).show();
				} else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
					Ti.UI.createAlertDialog({
						title:'OU Clicker',
						message:'Your system has disallowed Titanium from running geolocation services.'
					}).show();
				}
			}

			//
			// IF WE HAVE COMPASS GET THE HEADING
			//
			if (Titanium.Geolocation.hasCompass) {
				//
				//  TURN OFF ANNOYING COMPASS INTERFERENCE MESSAGE
				//
				Titanium.Geolocation.showCalibration = false;

				//
				// SET THE HEADING FILTER (THIS IS IN DEGREES OF ANGLE CHANGE)
				// EVENT WON'T FIRE UNLESS ANGLE CHANGE EXCEEDS THIS VALUE
				Titanium.Geolocation.headingFilter = 90;

				//
				//  GET CURRENT HEADING - THIS FIRES ONCE
				//
				Ti.Geolocation.getCurrentHeading( function(e) {
					if (e.error) {
						ouClicker.location.heading = 'error: ' + e.error;
						Ti.API.info("Code translation: "+translateErrorCode(e.code));
						return;
					}
					var x = e.heading.x;
					var y = e.heading.y;
					var z = e.heading.z;
					var magneticHeading = e.heading.magneticHeading;
					var accuracy = e.heading.accuracy;
					var trueHeading = e.heading.trueHeading;
					var timestamp = e.heading.timestamp;

					ouClicker.location.heading= 'x:' + x + ' y: ' + y + ' z:' + z;
					Titanium.API.info('geo - current heading: ' + new Date(timestamp) + ' x ' + x + ' y ' + y + ' z ' + z);
				});
				//
				// EVENT LISTENER FOR COMPASS EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON HEADING FILTER)
				//
				var headingCallback = function(e) {
					if (e.error) {
						Ti.API.info("Code translation: "+translateErrorCode(e.code));
						return;
					}

					var x = e.heading.x;
					var y = e.heading.y;
					var z = e.heading.z;
					var magneticHeading = e.heading.magneticHeading;
					var accuracy = e.heading.accuracy;
					var trueHeading = e.heading.trueHeading;
					var timestamp = e.heading.timestamp;

					Titanium.API.info('geo - heading updated: ' + new Date(timestamp) + ' x ' + x + ' y ' + y + ' z ' + z);
				};
				Titanium.Geolocation.addEventListener('heading', headingCallback);
				headingAdded = true;
			} else {
				Titanium.API.info("No Compass on device");

			}

			//
			//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
			//
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

			//
			//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
			//  THIS VALUE IS IN METERS
			//
			Titanium.Geolocation.distanceFilter = 10;

			//
			// GET CURRENT POSITION - THIS FIRES ONCE
			//
			Titanium.Geolocation.getCurrentPosition( function(e) {
				if (!e.success || e.error) {
					ouClicker.location.currentLocation = 'error: ' + JSON.stringify(e.error);
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					alert('error ' + JSON.stringify(e.error));
					return;
				}

				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;
				Ti.API.info('speed ' + speed);
				ouClicker.location.currentLocation = 'long:' + longitude + ' lat: ' + latitude;

				Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
			});
			//
			// EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
			//
			var locationCallback = function(e) {
				if (!e.success || e.error) {
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					return;
				}

				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;

				ouClicker.location.longitude = longitude;
				ouClicker.location.latitude = latitude;
				ouClicker.location.accuracy = accuracy;
				ouClicker.location.time = new Date(timestamp);

				// reverse geo
				Titanium.Geolocation.reverseGeocoder(latitude,longitude, function(evt) {
					if (evt.success) {
						var places = evt.places;
						if (places && places.length) {
							ouClicker.location.reverseGeo = places[0].address;
						} else {
							ouClicker.location.reverseGeo = "No address found";
						}
						Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
						ouClicker.location.city = evt.places[0].city;

						callback(ouClicker.location.city);
					} else {
						Ti.UI.createAlertDialog({
							title:'Reverse geo error',
							message:evt.error
						}).show();
						Ti.API.info("Code translation: "+translateErrorCode(e.code));

						// TODO implement reverse geo location based on latitude longitude
						ouClicker.location.city = 'Heerlen';
						callback('Heerlen');
					}
				});
				Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
			};
			Titanium.Geolocation.addEventListener('location', locationCallback);
			locationAdded = true;
		}
		var addr = "2065 Hamilton Avenue San Jose California 95125";

		Titanium.Geolocation.forwardGeocoder(addr, function(evt) {
			Ti.API.info('in forward ');
			ouClicker.location.forwardGeo = "lat:"+evt.latitude+", long:"+evt.longitude;
			Titanium.Geolocation.reverseGeocoder(evt.latitude,evt.longitude, function(evt) {
				if (evt.success) {
					var text = "";
					for (var i = 0; i < evt.places.length; i++) {
						text += "" + i + ") " + evt.places[i].address + "\n";
					}
					Ti.API.info('Reversed forward: '+text);
				} else {
					Ti.UI.createAlertDialog({
						title:'Forward geo error',
						message:evt.error
					}).show();
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
				}
			});
		});
		if (Titanium.Platform.name == 'android') {
			//  as the destroy handler will remove the listener, only set the pause handler to remove if you need battery savings
			Ti.Android.currentActivity.addEventListener('pause', function(e) {
				Ti.API.info("pause event received");
				if (headingAdded) {
					Ti.API.info("removing heading callback on pause");
					Titanium.Geolocation.removeEventListener('heading', headingCallback);
					headingAdded = false;
				}
				if (locationAdded) {
					Ti.API.info("removing location callback on pause");
					Titanium.Geolocation.removeEventListener('location', locationCallback);
					locationAdded = false;
				}
			});
			Ti.Android.currentActivity.addEventListener('destroy', function(e) {
				Ti.API.info("destroy event received");
				if (headingAdded) {
					Ti.API.info("removing heading callback on destroy");
					Titanium.Geolocation.removeEventListener('heading', headingCallback);
					headingAdded = false;
				}
				if (locationAdded) {
					Ti.API.info("removing location callback on destroy");
					Titanium.Geolocation.removeEventListener('location', locationCallback);
					locationAdded = false;
				}
			});
			Ti.Android.currentActivity.addEventListener('resume', function(e) {
				Ti.API.info("resume event received");
				if (!headingAdded) {
					Ti.API.info("adding heading callback on resume");
					Titanium.Geolocation.addEventListener('heading', headingCallback);
					headingAdded = true;
				}
				if (!locationAdded) {
					Ti.API.info("adding location callback on resume");
					Titanium.Geolocation.addEventListener('location', locationCallback);
					locationAdded = true;
				}
			});
		}

	}
})();
Ti.include(
'/ouClicker/location/version.js'
);