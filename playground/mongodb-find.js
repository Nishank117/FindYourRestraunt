const {MongoClient,ObjectID} = require ('mongodb');

var url = 'mongodb://localhost:27017/Api';
MongoClient.connect(url, (err,client)=>{
    if(err){
        return console.log('We were unable to connect to mongodb server');
    }
    console.log('Connected to MongoDb server');

    const db = client.db('Api');

    db.collection('Restraunt').find({open:true}).toArray()
    .then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(error)=>{
        console.log('Unable to fetch Data',err);
    });

}); //connect to the mongodb server
