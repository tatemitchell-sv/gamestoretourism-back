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
            if (store.name.toLowerCase(searchString.toLowerCase())){
                return store;
            }
            if (store.locations.city.toLowerCase(searchString.toLowerCase())){
                return store;
            }
            if (store.locations.zip.toLowerCase(searchString.toLowerCase())){
                return store;
            }
            if (store.locations.state.toLowerCase(searchString.toLowerCase())){
                return store;
            }
            if (store.locations.statelong.toLowerCase(searchString.toLowerCase())){
                return store;
            }
    
            const productFound = store.productsServices.find(product => {
                if (product.name.toLowerCase() === searchString.toLowerCase()){
                    return product;
                }
            });
            if(productFound){ return store; };
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

app.listen(PORT, () => {
    console.log('app now listening on ' + PORT);
});