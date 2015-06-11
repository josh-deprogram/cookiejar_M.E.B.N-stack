var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// var server = new Server('localhost', 27017, {auto_reconnect: true});
// db = new Db('dbp_beta', server, {safe: true});
// db.open(function(err, db) {
//     if(!err) {
//         console.log("Connected to 'dbp_beta' database");
//         db.collection('items', {safe:true}, function(err, collection) {
//             if (err) {
//                 console.log("The 'items' collection doesn't exist. Creating it with sample data...");
//                 populateDB();
//             }
//         });
//     }
// });

// Connect to the Live db
mongo.connect("mongodb://admin:admin@ds041432.mongolab.com:41432/dbp_beta", function(err, dblive) {
  if(!err) {
    console.log("We are connected");
    db = dblive
    db.collection('items', {safe:true}, function(err, collection) {
        if (err) {
            console.log("The 'items' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
  }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection('items', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('items', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addItem = function(req, res) {
    var item = req.body;
    console.log('Adding item: ' + JSON.stringify(item));
    db.collection('items', function(err, collection) {
        collection.insert(item, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateItem = function(req, res) {
    var id = req.params.id;
    var item = req.body;
    delete item._id;
    console.log('Updating item: ' + id);
    console.log(JSON.stringify(item));
    db.collection('items', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, item, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating item: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(item);
            }
        });
    });
}

exports.deleteItem = function(req, res) {
    var id = req.params.id;
    console.log('Deleting item: ' + id);
    db.collection('items', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*-------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.

var populateDB = function() {

    var items = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely item, which makes an excellent complement to fish dishes.",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert item market. Light and bouncy, with a hint of black truffle, this item will not fail to tickle the taste buds.",
        picture: "lan_rioja.jpg"
    }
    ];

    db.collection('items', function(err, collection) {
        collection.insert(items, {safe:true}, function(err, result) {});
    });

};
