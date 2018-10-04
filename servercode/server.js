var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
const Item = require('./model/item');


databaselink = 'mongodb://root:a11Cowseatgrass@ds157818.mlab.com:57818/shoppinglist';
var app = express();
app.use(cors());
app.use(bodyparser.json());

const PORT = process.env.PORT || 3000;


app.use(express.static(__dirname));
app.get('/', function(req, res){
   // res.sendFile(path.join(__dirname+'something'));
   res.sendfile('index.html');
});


mongoose.connect(databaselink);

mongoose.connection.on('connected',()=>{
    console.log("Sucessfully connectd to mongoDB");
});

mongoose.connection.on('error',(err)=>{
    console.log(err);
});



app.get('/item',(req,res,next)=>{
    Item.find(function(err,items){
        if (err){res.json(err);
       }
        else {
            res.json(items);
        }

    });
});


app.post('/item',(req,res,next)=>{
    let newShoppingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });

    newShoppingItem.save((err,item)=>{
        if (err){
            res.json(err);
        } else{
            res.json({msg: 'Item has been added to the database'});
        }
    })
});



app.listen(PORT,()=> {
    console.log("Server started on port 3000");
    });

