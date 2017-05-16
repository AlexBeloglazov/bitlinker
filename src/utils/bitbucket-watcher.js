
function injection (window_object, callback) {

	if (!window_object || !window_object.document || !window_object.document.querySelector) {
		throw new Error("Missing or invalid argument: window object");
	}

	if (!callback || typeof callback !== "function") {
		throw new Error("Missing or invalid argument: callback");
	}

	// select a parent for the CodeMirror
	let container = window_object.document.querySelector('section.aui-page-panel-content');

	if (!container) {
		console.log("watcher: main container not found!");
		return;
	}

	let mainObserver = new window_object.MutationObserver(() => {console.log("cb fired"); callback()});
	let observerConfig = {
		childList: true,
		subtree: true,
		attributes: false
	};

	mainObserver.observe(container, observerConfig);

	// explicitly call the script to handle the case where the page were loaded locally
	callback();
};


module.exports = injection;
