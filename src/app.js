import BitLinker from './bitlinker';
import watcher from './utils/bitbucket-watcher';
import storage from './utils/storage';


storage.load().then(() => {
    if (!window.location.href.match(storage.get('bitlinker.server_url'))) {
        return;
    }

    const bitlinker = new BitLinker();
    watcher(window, bitlinker.run.bind(bitlinker, null));
});
