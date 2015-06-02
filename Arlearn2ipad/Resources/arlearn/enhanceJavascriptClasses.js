String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}
String.prototype.startsWith = function (a) {
    return this.substr(0, a.length) === a;
}

String.prototype.contains = function(str) {
	return (this.indexOf(str) != -1);
}
String.prototype.removeFirstCharacter = function(c) {
	if (this.startsWith(c)) return this.substr(1);
	return this;
}
String.prototype.getLngFromFusion = function() {
	var self = this.trim();
	if (self.contains(' ')) {
		return self.substring(self.indexOf(' '), self.length).trim().getLatFromFusion();
	}
}
String.prototype.getLatFromFusion = function() {
	var self = this.trim();
	if (self.contains(' ')) {
		return self.substring(0, self.indexOf(' '));
	} else {
		return self;
	}
}