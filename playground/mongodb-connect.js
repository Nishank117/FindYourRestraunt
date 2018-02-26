const {MongoClient,ObjectID} = require ('mongodb');

var url = 'mongodb://localhost:27017/Api';
MongoClient.connect(url, (err,client)=>{
    if(err){
        return console.log('We were unable to connect to mongodb server');
    }
    console.log('Connected to MongoDb server');

    const db = client.db('Api');

    db.collection('bookstore').insertOne({
        text: 'Restraunt 1',
        open : true
    },(error,result)=>{
        if(error){
            return console.log('Could not add data',error)
        }
        console.log(JSON.stringify(result.ops,undefined,2));//ops attribute is gonna save all the docs that was inserted.
    });
    db.collection('Users').insertOne({
        name: 'Nishank',
        age: 25,
        location: 'Silchar'
    },(error,result)=>{
        if(error){
            return console.log('Could not data',error);
        }
        console.log(result.ops[0]._id.getTimestamp());//timestamp
    })
    client.close();
}); //connect to the mongodb server
