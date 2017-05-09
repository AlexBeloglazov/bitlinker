
var injection = function(window_object, callback) {

if (!window_object || !window_object.document || !window_object.document.querySelector) {
	throw new Error("Missing or invalid argument: window object");
}

if (!callback || typeof callback !== "function") {
	throw new Error("Missing or invalid argument: callback");
}

var container = document.querySelector('.CodeMirror-code');

if (!container) {
	return;
}

var observerConfig = {
	childList: true,
	subtree: false
};

window_object._source_lines = 0;


var watcher = new window_object.MutationObserver(function (mutations) {
	
	// fire callback if more source code lines appeared on the webpage
	if (container.children.length > window_object._source_lines) {
		window_object._source_lines = container.children.length;
		callback(null);
	}
		
});

watcher.observe(container, observerConfig);

// callback(null);

};


module.exports = injection;
