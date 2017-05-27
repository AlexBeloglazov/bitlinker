
let saveButton = document.getElementById('save');

let fields = {
    'bitlinker.server_url': 'server',
    'bitlinker.api_ep': 'api'
};

chrome.storage.local.get(Object.keys(fields), (items) => {
    Object.entries(fields).forEach(([key, id]) => {
        document.getElementById(id).value = items[key] || '';
    });
});

saveButton.onclick = () => {
    chrome.storage.local.set(
        Object.entries(fields).reduce((obj, [key, id]) => {
            obj[key] = document.getElementById(id).value;
            return obj;
        }, {}),
        () => {
            saveButton.innerHTML = 'Saved!';
            setTimeout(() => { saveButton.innerHTML = 'Save'; }, 800);
        }
    );
};
