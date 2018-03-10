const _         = require ('lodash');
const express = require ('express');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');

const {ObjectID} = require ('mongodb');

var {mongoose}  = require ('./db/mongoose');
var {restraunt} = require ('./models/restraunt');
var {User}      = require ('./models/user')

const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());

app.post('/restraunt',(req,res)=>{
    var restraunt1 = new restraunt({
        name : req.body.name,
        geometry : req.body.geometry
    });
    restraunt1.save().then((doc)=>{
        res.status(200).send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});
app.get('/restraunt',(req,res)=>{
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
        restraunt.aggregate([
        {
            $geoNear : {
                near:{type: "Point", coordinates :[lng,lat]} ,
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical:true
        },
    }
]).then((doc)=>{
        res.status(200).send(doc);
    });
});
app.get('/restraunt/:id',(req,res)=>{

    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    restraunt.findById(id).then((doc)=>{
        if(!id){
            return res.status(404).send(doc);
        }
        res.send(doc);
        },(e)=>{
    res.status(404).send();
    })
});

app.delete('/restraunt/:id',(req,res)=>{

    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('the id is Invalid');
    }
    restraunt.findByIdAndRemove(id).then((doc)=>{
        if(!id){
            return res.status(400).send(doc);
        }
        res.status(200).send(doc);
    },(e)=>{
        res.send(e);
    })
});

app.put('/restraunt/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send('not Valid ID');
    }
    restraunt.findByIdAndUpdate(id,req.body).then((doc)=>{
        if(!id){
            res.status(400).send('restraunt');
        }
        res.send({doc});
    },(e)=>{
        res.status(404).send(e);
    });
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
module.exports = {app};
