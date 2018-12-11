const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose-conf');
const {SinUp} = require('./models/sinup');



var app = express();

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

app.listen(3000, ()=>{
    console.log(`Listen on Port 3000`);
});

module.exports = {app};