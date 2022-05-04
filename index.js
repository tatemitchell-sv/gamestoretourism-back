const express = require("express");
const cors = require("cors");
let data = require("./data/gamestores.js");
const searchUtils = require("./utils/searchUtils.js");
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json(data);
});

app.get('/store/:id', (req, res) => {
    const store = data.find(store => store.id === req.params.id);
    return res.json(store);
});

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

app.post('/createevent', (req, res) => {
    console.log('route /createevent requested');
    

    const { newEvent, storeID } = req.body;
    console.log('logging test: ', newEvent);

    let storetoreturn = {};

    data.forEach( store => {
        if (store.id === storeID){
            newEvent.id = store.events.length + 1;
            store.events.push(newEvent);
            storetoreturn = store;
        }
    });
    
    return res.json(storetoreturn);
});

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

app.listen(PORT, () => {
    console.log('app now listening on ' + PORT);
});