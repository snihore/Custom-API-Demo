const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {SinUp} = require('./../models/sinup');

var input = {
    name: 'Sourabh Nihore',
    email: 'souravnihore@gmail.com',
    pwd: 585878
}

var dumyObj =  [{

        _id: new ObjectID,
        name: 'Sourabh Nihore',
        email: 'souravnihore@gmail.com',
        pwd: 585878
    },
    {

        _id: new ObjectID,
        name: 'Tinku Nihore',
        email: 'nihores@gmail.com',
        pwd: 585878
    }]


beforeEach((done)=>{
    SinUp.remove({}).then(()=>{
        SinUp.insertMany(dumyObj).then(()=>done());
    });
});

describe('POST /sinup', ()=>{


    it('should req coming from body to server', (done)=>{
        request(app)
            .post('/sinup')
            .send(input)
            .expect(200)
            .expect((res)=>{
                expect(res.body.name).toBe(input.name);
                expect(res.body.email).toBe(input.email);
                expect(res.body.pwd).toBe(input.pwd);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                SinUp.find().then((docs)=>{
                    expect(docs.length).toBe(3);
                    expect(docs[2].name).toBe(input.name);
                    expect(docs[2].email).toBe(input.email);
                    expect(docs[2].pwd).toBe(input.pwd);
                    done();
                }).catch((e)=>done(e));
            });
    });
});

it('should test for bad request', (done)=>{
    request(app)
        .post('/sinup')
        .send({})
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            SinUp.find().then((docs)=>{
                expect(docs.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });
});

describe('GET /sinup', ()=>{
    it('should test for get data from server', (done)=>{
        request(app)
            .get('/sinup')
            .expect(200)
            .expect((res)=>{
                expect(res.body.docs.length).toBe(2);
                expect(res.body.docs[0].name).toEqual(dumyObj[0].name);
                expect(res.body.docs[1].email).toEqual(dumyObj[1].email);
                // console.log(res.body);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                done();
            });
    });
});


describe('GET /sinup/:id', ()=>{
    it('should test individual get request', (done)=>{
        request(app)
            .get(`/sinup/${dumyObj[0]._id}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.doc._id).toBe(dumyObj[0]._id.toHexString());
            })
            .end(done);
    });

    it('should test individual get invalid request', (done)=>{
        request(app)
            .get(`/sinup/123`)
            .expect(404)
            .end(done);
    });
    it('should test individual get unkown request', (done)=>{
        request(app)
            .get(`/sinup/5c10dee294be0d1edcadff85`)
            .expect(404)
            .end(done);
    });
});

