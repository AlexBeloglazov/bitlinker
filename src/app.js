import BitLinker from './bitlinker';
import watcher from './utils/bitbucket-watcher';
import storage from './utils/storage';


const bitlinker = new BitLinker();

watcher(window, bitlinker.run.bind(bitlinker, null));

let s = storage.get('test').then(s => {console.log(s)});