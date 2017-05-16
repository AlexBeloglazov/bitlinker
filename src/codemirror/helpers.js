import clickHandler from '../utils/click-handler';
import config from '../config';


// returns list of SPAN elements (represent a single line) to turn into a link
function _findMatchedGroup(match, lineGroup) {
    let matchedGroup = [];
    let groupText = "";
    for(var lineElement of lineGroup.childNodes) {
        if (!lineElement.nodeName.match(/span/i)) {
            matchedGroup.length = 0;
            groupText = "";
            continue;
        }
        matchedGroup.push(lineElement);
        groupText += lineElement.innerText;
        if (groupText.match(match)) {
            return {
                group: matchedGroup,
                text: groupText                
            };
        }
    }
}


function substituteWithLink(args) {
    let matchedGroup = _findMatchedGroup(args.match, args.group);
    if (!matchedGroup) {
        return;
    }
    let link = document.createElement('a');
    link.innerHTML = matchedGroup.text;
    link.className = matchedGroup.group[0].className;
    link.classList.add('bitlinker-link');

    // argument object for a click handler
    let outArgs = {
        match: args.match,
        bitbucketServerURL: config.bitbucketServerURL,
        blockOrigin: args.blockOrigin
    };

    link.addEventListener('click', clickHandler.bind(null, args.plugin, outArgs));
    matchedGroup.group[0].replaceWith(link);
    matchedGroup.group.forEach(element => element.remove());
}


export {
    substituteWithLink
};
