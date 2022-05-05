const express = require("express");
const cors = require("cors");
let data = require("./data/gamestores.js");
const searchUtils = require("./utils/searchUtils.js");
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

// get all stores
app.get('/', (req, res) => {
    return res.json(data);
});

// get featured stores
app.get('/featuredstores', (req, res) => {

    const featured = [...data];
    featured.length = 3;

    return res.json(featured);
});

// get store by id
app.get('/store/:id', (req, res) => {
    const store = data.find(store => store.id === req.params.id);
    return res.json(store);
});

// simple search (search bar)
app.post('/simplesearch', (req, res) => {

    if (req.body.searchString){

        const { searchString } = req.body;
        
        const filteredData = data.filter( store => {
            if (searchUtils.nameMatch(store,searchString) 
            || searchUtils.cityMatch(store,searchString) 
            || searchUtils.stateMatch(store,searchString)
            || searchUtils.zipMatch(store,searchString)){
                return store;
            };

            const productFound = store.productsServices.find(product => {
                if (searchUtils.productMatch(product, searchString)){
                    return product;
                }
            });
            if(productFound){ 
                return store; 
            };
        });

        return res.json(filteredData);

    }
    return res.json({});
});

// advanced search
app.post('/advancedsearch', (req, res) => {
    console.log('route /advancedsearch requested')
    console.log('logging test: ', req.body)

    const { storeName, city, state, zip, mtg, dnd, ygo, pok, soc} = req.body;

    const filteredData = data.filter( store => {
        if (searchUtils.nameMatch(store,storeName) 
        && searchUtils.cityMatch(store,city) 
        && searchUtils.stateMatch(store,state)
        && searchUtils.zipMatch(store,zip)){
            return store;
        }
    })

    console.log('filteredData = ', filteredData)
    return res.json(filteredData);
});

// create event
app.post('/createevent', (req, res) => {
    console.log('route /createevent requested');
    

    const { newEvent, storeID } = req.body;
    console.log('logging test: ', newEvent);

    let storetoreturn = {};

    data.forEach( store => {
        if (store.id === storeID){
            newEvent.id = store.events[store.events.length - 1].id + 1;
            store.events.push(newEvent);
            storetoreturn = store;
        }
    });
    
    return res.json(storetoreturn);
});


// create product
app.post('/createproduct', (req, res) => {
    console.log('route /createproduct requested');
    

    const { newProduct, storeID } = req.body;
    console.log('logging test: ', newProduct);

    let storetoreturn = {};

    data.forEach( store => {
        if (store.id === storeID){
            newProduct.id = store.productsServices[store.productsServices.length - 1].id + 1;
            store.productsServices.push(newProduct);
            storetoreturn = store;
        }
    });
    
    return res.json(storetoreturn);
});


// create image
app.post('/createimage', (req, res) => {
    console.log('route /createimage requested');
    

    const { newImage, storeID } = req.body;
    console.log('logging test: ', newImage);

    let storetoreturn = {};

    data.forEach( store => {
        if (store.id === storeID){
            store.gallery.push(newImage);
            storetoreturn = store;
        }
    });
    
    return res.json(storetoreturn);
});

// create store
app.post('/createstore', (req, res) => {
    console.log('route /createstore requested');
    
    const { newStore } = req.body;
    console.log('logging test: ', newStore.name);

    // create new id for store
    let newStoreID = +data[data.length - 1].id + 1;
    newStoreID = newStoreID.toString();

    console.log('logging test: newStoreID = ', newStoreID);

    // assign ID
    newStore.id = newStoreID;

    // add to data array
    data.push(newStore);

    return res.json(newStore);
});

// edit event
app.put('/editevent', (req, res) => {
    console.log('route /editevent requested');

    const { edittedEvent, storeID } = req.body;
    
    console.log('logging test: ', edittedEvent);

    let storetoreturn = {};

    data.forEach( (store, i) => {
        if (store.id === storeID){
            store.events.forEach( (event, j) => {
                if (event.id === edittedEvent.id){
                    data[i].events[j] = edittedEvent;
                }
            })
            storetoreturn = data[i];
        }
    });

    console.log('saved store is: ', storetoreturn);
    return res.json(storetoreturn);
});

// edit product
app.put('/editproduct', (req, res) => {
    console.log('route /editproduct requested');

    const { edittedProduct, storeID } = req.body;
    
    console.log('logging test: ', edittedProduct);

    let storetoreturn = {};

    data.forEach( (store, i) => {
        if (store.id === storeID){
            store.productsServices.forEach( (product, j) => {
                if (product.id === edittedProduct.id){
                    data[i].productsServices[j] = edittedProduct;
                }
            })
            storetoreturn = data[i];
        }
    });

    console.log('saved store is: ', storetoreturn);
    return res.json(storetoreturn);
});


// edit store
app.put('/editstore', (req, res) => {
    console.log('route /editstore requested');

    const { edittedStore, storeID } = req.body;
    
    console.log('logging test: ', edittedStore);

    let storetoreturn = {};

    data.forEach( (store, i) => {
        if (store.id === storeID) {
            data[i] = edittedStore;
            storetoreturn = data[i];
        }
    })

    console.log('saved store is: ', storetoreturn);
    return res.json(storetoreturn);
});

// delete store
app.delete('/deletestore', (req,res) => {
    console.log('route /deletestore requested');
    console.log('logging test 1: ', req.body);

    const { storeID } = req.body;
    data = data.filter( store => {
        if (store.id !== storeID) {
            return store;
        }
    })

    return res.json(data);
});

// delete event
app.delete('/deleteevent', (req,res) => {
    console.log('route /deleteevent requested');
    console.log('logging test 1: ', req.body);
    const { eventID, storeID } = req.body;
    let storetoreturn = {};
    console.log('logging test 2: ', eventID);
    data.forEach( store => {
        if (store.id === storeID){
            store.events = store.events.filter(event => {
                if(event.id !== eventID){
                    return event;
                }
            })
            storetoreturn = store;
        }
    })
    console.log('saved store is: ', storetoreturn);
    return res.json(storetoreturn);
});

// delete product
app.delete('/deleteproduct', (req,res) => {
    console.log('route /deleteproduct requested');
    console.log('logging test 1: ', req.body);
    const { productID, storeID } = req.body;
    let storetoreturn = {};
    console.log('logging test 2: ', productID);
    data.forEach( store => {
        if (store.id === storeID){
            store.productsServices = store.productsServices.filter(product => {
                if(product.id !== productID){
                    return product;
                }
            })
            storetoreturn = store;
        }
    })
    console.log('saved store is: ', storetoreturn);
    return res.json(storetoreturn);
});

// delete image
app.delete('/deleteimage', (req,res) => {
    console.log('route /deleteimage requested');
    console.log('logging test 1: ', req.body);
    const { imageToDelete, storeID } = req.body;
    let storetoreturn = {};
    console.log('logging test 2: ', imageToDelete);
    data.forEach( store => {
        if (store.id === storeID){
            store.gallery = store.gallery.filter(image => {
                if(image.id !== imageToDelete.id){
                    return image;
                }
            })
            storetoreturn = store;
        }
    })
    console.log('saved store is: ', storetoreturn);
    return res.json(storetoreturn);
});

app.listen(PORT, () => {
    console.log('app now listening on ' + PORT);
});