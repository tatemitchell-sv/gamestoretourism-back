const express = require("express");
const cors = require("cors");
const data = require("./data/gamestores.js");
const searchUtils = require("./utils/searchUtils.js");
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

app.get('/', (rec, res) => {
    return res.json(data);
});

app.get('/store/:id', (rec, res) => {
    const store = data.find(store => store.id === rec.params.id);
    return res.json(store);
});

app.post('/simplesearch', (rec, res) => {

    if (rec.body.searchString){

        const { searchString } = rec.body;
        
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

app.post('/advancedsearch', (rec, res) => {
    console.log('route /advancedsearch requested')
    console.log('logging test: ', rec.body)

    const { storeName, city, state, zip, mtg, dnd, ygo, pok, soc} = rec.body;

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

app.post('/createevent', (rec, res) => {
    console.log('route /createevent requested');
    

    const { newEvent, storeID } = rec.body;
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

app.listen(PORT, () => {
    console.log('app now listening on ' + PORT);
});