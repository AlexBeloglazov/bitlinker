
// Promise based function for sending HTTP requests
function sendRequest(method, url, timeout, toJSON) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open(method, url);
		request.timeout = timeout || 300;
		request.onreadystatechange = () => {
			console.log('state: ', request.readyState, '  status: ', request.status);
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

export default {
	sendRequest
};
