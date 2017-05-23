
// Promise based function for sending HTTP requests
function sendRequest(method, url, toJSON) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open(method, url);
		request.onload = () => {
			let response;
			try {
				response = (toJSON) ? JSON.parse(request.responseText)
									: request.responseText;
			}
			catch (err) { response = {error: err}; }
			resolve((request.status === 200) ? response : ((toJSON) ? {} : null));
		};

		request.onerror = () => {
			resolve(null);
		};

		request.send();
	});
}

export default {
	sendRequest
};