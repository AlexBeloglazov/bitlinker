
// Promise based function for sending HTTP requests
function sendRequest(method, url, timeout, toJSON) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open(method, url);
		request.timeout = timeout || 500;
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				let response;
				try {
					response = (toJSON) ? JSON.parse(request.responseText)
										: request.responseText;
				}
				catch (err) { response = {error: err}; }
				resolve((request.status === 200) ? response : ((toJSON) ? {} : null));
			}
		};

		request.send();
	});
}

// Use this function to make requests to cross-origin resources
function corsRequest(method, url, timeout, toJSON) {
	let requestArgs = {
		type: 'corsRequest',
		payload: {method, url, timeout, toJSON}
	};

	return new Promise((resolve, reject) => {
  		chrome.runtime.sendMessage(requestArgs, (response) => {
  			resolve((response || {}).payload);
    	});
	});
}

export {
	sendRequest,
	corsRequest
};
