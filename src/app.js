import BitLinker from './bitlinker';
import watcher from './utils/bitbucket-watcher';

const bitlinker = new BitLinker();

watcher(window, bitlinker.run.bind(bitlinker, null));
