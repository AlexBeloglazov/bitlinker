

export default {
    get: (keys) => {
	    let promise = new Promise((resolve, reject) => {
	        chrome.storage.local.get(keys, (items) => {
	            let err = chrome.runtime.lastError;
	            if (err) {
	                reject(err);
	            } else {
	                resolve(items);
	            }
	        });
	    });
    return promise;
    },

    set: (items) => {
        let promise = new Promise((resolve, reject) => {
            chrome.storage.local.set(items, () => {
                let err = chrome.runtime.lastError;
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    	return promise;
    }
}