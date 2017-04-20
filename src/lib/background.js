
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.text == "fromscript") {
			sendResponse({text: request.text + "_bounced"})
		}
	}
);

