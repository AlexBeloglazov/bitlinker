import clickHandler from '../utils/click-handler';


// returns list of SPAN elements to turn into a link
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


function substituteWithLink(group, match, plugin) {
    let matchedGroup = _findMatchedGroup(match, group);
    if (!matchedGroup) {
        return;
    }
    let link = document.createElement('a');
    link.innerHTML = matchedGroup.text;
    link.className = matchedGroup.group[0].className;
    link.classList.add('bitlinker-link');
    link.addEventListener('click', clickHandler.bind(null, plugin, match));
    matchedGroup.group[0].replaceWith(link);
    matchedGroup.group.forEach(element => element.remove());
}


export {
    substituteWithLink
};
