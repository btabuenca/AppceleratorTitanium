/**
 * ARLearn Platform
 * Copyright (c) 2009-2011 by Open Universiteit. All Rights Reserved.
 * ARLearn2 is licensed under the terms of GNU GENERAL PUBLIC LICENSE (Version 2, June 1991).
 * Please see the LICENSE included with this distribution for details.
 * Author: Stefaan Ternier
 **/

(function() {

	var view = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {
			latitude:50.87,
			longitude:5.95,
			latitudeDelta:0.01,
			longitudeDelta:0.01
		},
		animate:true,
		regionFit:true,
		userLocation:true,
		annotations:[]
	});

	ar.ui.createMapView = function() {

		return view;
	}
	ar.ui.map = {};

	ar.ui.map.loadGeneralItems = function() {
		var items = ar.db.generalItem.getGeneralItems();
		Ti.API.info("loading map gi" +JSON.stringify(items))
		for (var itemId in items ) {
			var annotation = Titanium.Map.createAnnotation({
				latitude:items[itemId].lat,
				longitude:items[itemId].lng,
				title:items[itemId].name,
				subtitle:items[itemId].description,
				pincolor:Titanium.Map.ANNOTATION_RED,
				animate:true,
				leftButton: '../images/appcelerator_small.png',
				myid:itemId // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
			});
			view.addAnnotation(annotation);
		}

	};
})();