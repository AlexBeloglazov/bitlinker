import {sendRequest} from '../utils/network';


function newTabListener() {
  chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
    if (type !== 'newTab') return;
    chrome.tabs.create({
	    url: payload.url,
	    index: sender.tab.index + 1,
	    active: payload.active,
  	});
  });
};


function corsListener() {
  chrome.runtime.onMessage.addListener(({ type, payload }, sender, sendResponse) => {
    if (type !== 'corsRequest') return;
    sendRequest(payload.method, payload.url, payload.timeout, payload.toJSON).then(response => {
    	sendResponse({payload: response});
    });
    return true;
  });
};


export default {
	newTabListener,
	corsListener
};
