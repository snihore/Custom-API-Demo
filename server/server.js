const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose-conf');
const {SinUp} = require('./models/sinup');



var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/sinup', (req, res)=>{
    console.log(`REQUEST: ${JSON.stringify(req.body)}`);

    var sinup1 = new SinUp(req.body);
    sinup1.save().then((doc)=>{
        console.log('Data is Saved ...');
        res.send(doc);
    }).catch((e)=>{
        console.log('Data is Not Saved ...');
        res.sendStatus(400);
        console.log(res.statusMessage);
    });
    console.log('REQUEST END');
    
});

///  Get Data from SERVER
app.get('/sinup', (req, res)=>{
    SinUp.find().then((docs)=>{
        if(docs.length===0){
            res.send('No Content');
            
        }else{
            res.send({docs});
        }
    }).catch((e)=>{
        console.log(e);
    });
});

/// Get individual item
app.get('/sinup/:id', (req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.sendStatus(404);
    }

    SinUp.findById(id).then((doc)=>{
        if(!doc){
            return res.sendStatus(404);
        }

        res.send({doc});
    }).catch((e)=>{
        res.sendStatus(400);
    });
    
});

/// delete individual item request
app.delete('/sinup/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.sendStatus(404);
    }

    SinUp.findByIdAndDelete(id).then((doc)=>{
        if(!doc){
            return res.sendStatus(404);
        }

        res.send({doc});
    }).catch((e)=>{
        res.sendStatus(400);
    });
});


app.patch('/sinup/:id', (req, res)=>{
    var id = req.params.id;
    var body = req.body;
    if(!ObjectID.isValid(id)){
        return res.sendStatus(404);
    }

    SinUp.findByIdAndUpdate(id, {$set: body}, {new: true}).then((result)=>{
        res.send({doc: result});
    }).catch((e)=>{
        res.sendStatus(400);
    });
});

app.listen(port, ()=>{
    console.log(`Listen on Port ${port}`);
});

module.exports = {app};