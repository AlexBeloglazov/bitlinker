
function injection (window_object, callback) {

	if (!window_object || !window_object.document || !window_object.document.querySelector) {
		throw new Error("Missing or invalid argument: window object");
	}

	if (!callback || typeof callback !== "function") {
		throw new Error("Missing or invalid argument: callback");
	}

	var container = window_object.document.querySelector('section.aui-page-panel-content');

	if (!container) {
		console.log("watcher: main container not found!");
		return;
	}

	var mainObserver = new window_object.MutationObserver(_codeMirrorInjection);
	mainObserver.observe(container, {childList: true, subtree: true, attributes: false});


	function _codeMirrorInjection(mutations) {
		// check if mutations result in codemirror container
		var codeMirror = window_object.document.querySelector('div.CodeMirror-code');

		if (!codeMirror) {
			return;
		}

		// codemirror container found so we can disconnect observer from ancestor
		mainObserver.disconnect();

		new window_object.MutationObserver(function(mutations) {
			console.log('fired');
			callback();
		}).observe(codeMirror, {childList: true, subtree: true, attributes:true});

		callback();
	}

	_codeMirrorInjection(null);
};


module.exports = injection;
