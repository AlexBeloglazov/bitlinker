import config from '../config';


function clickHandler(plugin, match, ev) {
    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: plugin.resolve(match),
        active: true,
      },
    });

}


export default clickHandler;
