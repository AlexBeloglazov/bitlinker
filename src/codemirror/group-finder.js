
function findMatchedGroup(matched, lineGroup) {
    let out = [];
    let concatenated = "";
    for(var lineElement of lineGroup.childNodes) {
        if (!lineElement.nodeName.match(/span/i)) {
            out.length = 0;
            concatenated = "";
            continue;
        }
        out.push(lineElement);
        concatenated += lineElement.innerText;
        if (concatenated === matched) {
            break;
        }
    }
    return out;
}

export default findMatchedGroup;
