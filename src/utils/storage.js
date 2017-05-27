
let storage = {};


export default {
    load: () => {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(null, items => {
                Object.assign(storage, items);
                resolve();
            });
        });
    },

    get: (key) => {
        if (!storage[key]) {
            throw new Error(`${key} is not set/found in Local Storage`);
        }
        return storage[key];
    }
};
