


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();



//
// create base UI tab and root window
//
var window = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

// Include files
//Ti.include("jquery.min.js");
Ti.include("strophe.js");



Ti.API.debug("btabuenca. 1");
/*
// Strophestival
var conn = new Strophe.Connection('http://localhost/http-bind');
Ti.API.debug("btabuenca. 2");
conn.connect('btb@localhost', 'btb', OnConnectionStatus);
Ti.API.debug("btabuenca. 3");

function OnConnectionStatus(nStatus)
{
	Ti.API.debug("onConnectionStatus ..."+nStatus);       
}

Ti.API.debug("btabuenca. 4");
*/



var html = '<html><body>';
html += '<script>alert("cacafuti");var conn = new Strophe.Connection("http://localhost/http-bind");conn.connect("btb@localhost", "btb", OnConnectionStatus);alert("putamierda");</script>';
html += '<div id="button" style="background-color:red;height:80px;width:200px;color:white;text-align:center;line-height:80px">Take Photo</div>';
html += '<script>document.getElementById("button").onclick= function(){Ti.App.fireEvent("camera_button")}</script>';
html +='</body></html>';
var webview = Ti.UI.createWebView({
	bottom:10,
	height:80,
	width:200,
	backgroundColor:'#ff0000',
	html:html
});

Ti.App.addEventListener('camera_button', function()
{
	Ti.API.debug("aaaaaaa ...");
});


window.add(webview);


var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:window
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

window.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
