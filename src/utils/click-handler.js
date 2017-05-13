import config from '../config';


function clickHandler(plugin, match, ev) {
console.log(e);
    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: plugin.resolve(match),
        active: true,
      },
    });

}


export default clickHandler;
