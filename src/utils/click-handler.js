import config from '../config';


function clickHandler(plugin, match) {

    chrome.runtime.sendMessage({
      type: 'newTab',
      payload: {
        url: "https://www.google.com/search?q="+match,
        active: true,
      },
    });

}


export default clickHandler;