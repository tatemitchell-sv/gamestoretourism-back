const utils = {

    nameMatch: (store, string) => {
        if (!string) {
            return true;
        }
        return store.name.toLowerCase().includes(string.toLowerCase());
    },

    cityMatch: (store, string) => {
        if (!string) {
            return true;
        }
        return store.locations.city.toLowerCase().includes(string.toLowerCase());
    },

    stateMatch: (store, string) => {
        if (!string) {
            return true;
        }
        return store.locations.state.toLowerCase().includes(string.toLowerCase());
    },

    zipMatch: (store, string) => {
        if (!string) {
            return true;
        }
        return store.locations.zip.toLowerCase().includes(string.toLowerCase());
    },

    productMatch: (product, string) => {
        return product.name.toLowerCase().includes(string.toLowerCase());
    },

    // mtgMatch: (store, boolean) => {
    //     if (!string) {
    //         return true;
    //     }
    //     return store.name.toLowerCase().includes(string.toLowerCase());
    // },

    // dndMatch: (store, string) => {
    //     if (!string) {
    //         return true;
    //     }
    //     return store.name.toLowerCase().includes(string.toLowerCase());
    // },

    // ygoMatch: (store, string) => {
    //     if (!string) {
    //         return true;
    //     }
    //     return store.name.toLowerCase().includes(string.toLowerCase());
    // },

    // pokMatch: (store, string) => {
    //     if (!string) {
    //         return true;
    //     }
    //     return store.name.toLowerCase().includes(string.toLowerCase());
    // },

    // socMatch: (store, string) => {
    //     if (!string) {
    //         return true;
    //     }
    //     return store.name.toLowerCase().includes(string.toLowerCase());
    // },
}
module.exports = utils;