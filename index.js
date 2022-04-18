const express = require("express");
const app = express();
const PORT = 8081;

app.get('/', (rec, res) => {
    res.json([
        {
            "name": "Round Table Games",
            "locations": {
                "latitude": "43.490080",
                "longitude": "-112.023890",
                "streetAddress1": "886 S Holmes Ave",
                "streetAddress2": "",
                "city": "Idaho Falls",
                "state": "ID",
                "zip": "83401"
            },
            "hours": [
                {
                    "Monday": {
                        "open": "12PM",
                        "close": "6PM"
                    },
                    "Tuesday": {
                        "open": "12PM",
                        "close": "6PM"
                    },
                    "Wednesday": {
                        "open": "",
                        "close": ""
                    },
                    "Thursday": {
                        "open": "12PM",
                        "close": "6PM"
                    },
                    "Friday": {
                        "open": "12PM",
                        "close": "9PM"
                    },
                    "Saturday": {
                        "open": "11AM",
                        "close": "9PM"
                    },
                    "Sunday": {
                        "open": "",
                        "close": ""
                    }
                }
            ],
            "phonenumber": "(208) 607-9333",
            "website": "",
            "thumbnail": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=vjAbf1QM90B32A3x2XNKfA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=281.6134&pitch=0&thumbfov=100",
            "productsServices": [
                {
                    "name": "Magic: The Gathering",
                    "info": "",
                    "img": "",
                    "link": ""
                },
                {
                    "name": "Settlers of Catan",
                    "info": "",
                    "img": "",
                    "link": ""
                },
                {
                    "name": "Yu-Gi-OH",
                    "info": "",
                    "img": "",
                    "link": ""
                }
            ],
            "events": [
                {
                    "name": "",
                    "type": "",
                    "info": "",
                    "fee": "",
                    "time": ""
                }
            ]
        },
        {
            "name": "A Street Games",
            "locations": {
                "latitude": "43.492510",
                "longitude": "-112.041210",
                "streetAddress1": "369 Park Ave",
                "streetAddress2": "",
                "city": "Idaho Falls",
                "state": "ID",
                "zip": "83402"
            },
            "hours": [
                {
                    "Monday": {
                        "open": "11AM",
                        "close": "7PM"
                    },
                    "Tuesday": {
                        "open": "11AM",
                        "close": "7PM"
                    },
                    "Wednesday": {
                        "open": "11AM",
                        "close": "7PM"
                    },
                    "Thursday": {
                        "open": "11AM",
                        "close": "7PM"
                    },
                    "Friday": {
                        "open": "11AM",
                        "close": "7PM"
                    },
                    "Saturday": {
                        "open": "11AM",
                        "close": "7PM"
                    },
                    "Sunday": {
                        "open": "",
                        "close": ""
                    }
                }
            ],
            "phonenumber": "",
            "website": "https://m.facebook.com/AStreetGames/",
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipNnQDeSsj3nrbwfKLIIUW415A0FYnY-i_gnuPjR=w408-h725-k-no",
            "productsServices": [
                {
                    "name": "Magic: The Gathering",
                    "info": "",
                    "img": "",
                    "link": ""
                },
                {
                    "name": "Settlers of Catan",
                    "info": "",
                    "img": "",
                    "link": ""
                },
                {
                    "name": "Yu-Gi-OH",
                    "info": "",
                    "img": "",
                    "link": ""
                }
            ],
            "events": [
                {
                    "name": "",
                    "type": "",
                    "info": "",
                    "fee": "",
                    "time": ""
                }
            ]
        },
        {
            "name": "Madness Games & Comics",
            "locations": {
                "latitude": "33.039810",
                "longitude": "-96.731567",
                "streetAddress1": "3000 Custer Rd",
                "streetAddress2": "#310",
                "city": "Plano",
                "state": "TX",
                "zip": "75075"
            },
            "hours": [
                {
                    "Monday": {
                        "open": "11AM",
                        "close": "9PM"
                    },
                    "Tuesday": {
                        "open": "11AM",
                        "close": "9PM"
                    },
                    "Wednesday": {
                        "open": "10AM",
                        "close": "9PM"
                    },
                    "Thursday": {
                        "open": "11AM",
                        "close": "9PM"
                    },
                    "Friday": {
                        "open": "11AM",
                        "close": "12AM"
                    },
                    "Saturday": {
                        "open": "10AM",
                        "close": "12AM"
                    },
                    "Sunday": {
                        "open": "11AM",
                        "close": "9PM"
                    }
                }
            ],
            "phonenumber": "",
            "website": "http://www.madnessgames.com/",
            "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipPMRd1Y_cx7b8mRhzxwupwsqbfo69Dj80-Y2Umg=w426-h240-k-no",
            "productsServices": [
                {
                    "name": "Magic: The Gathering",
                    "info": "",
                    "img": "",
                    "link": ""
                },
                {
                    "name": "Settlers of Catan",
                    "info": "",
                    "img": "",
                    "link": ""
                },
                {
                    "name": "Yu-Gi-OH",
                    "info": "",
                    "img": "",
                    "link": ""
                }
            ],
            "events": [
                {
                    "name": "",
                    "type": "",
                    "info": "",
                    "fee": "",
                    "time": ""
                }
            ]
        }
    ])
})

app.listen(PORT, () => {
    console.log('app now listening on ' + PORT);
})