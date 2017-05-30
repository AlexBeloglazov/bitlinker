import BitLinker from './bitlinker';
import watcher from './utils/bitbucket-watcher';
import storage from './utils/storage';

// load app settings from chrome.storage
storage.load().then(() => {
	// stop here if we are not visiting Bitbucket server
    if (!window.location.href.match(storage.get('bitlinker.server_url'))) {
        return;
    }

    const bitlinker = new BitLinker();
    // run bitlinker every time when there are changes in the code section
    watcher(window, bitlinker.run.bind(bitlinker, null));
});
