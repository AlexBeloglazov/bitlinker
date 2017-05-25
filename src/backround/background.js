import listeners from './listeners';

listeners.newTabListener();
listeners.corsListener();

chrome.storage.local.set({test: 'passed'}, () => {console.log('saved!');});