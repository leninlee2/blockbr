var express                     = require('express');
var cors                        = require('cors');
var bodyParser                  = require('body-parser');
var postRepository              = require('../../blockbr.backend.infrastructure/repository/post.repository');
var settings                    = require('../../settings.json');
var { Connection, sequelize }   = require('../../blockbr.backend.infrastructure/context/mysql.connection');
//var authentication              = require('./authenticationutil');
const fs                        = require('fs');
const https                     = require('https');
//const compairit                 = 'tierdigital';

//var key = fs.readFileSync('private.key');
//var cert = fs.readFileSync('certificate.crt');
//var options = {
//  key: key,
//  cert: cert
//};

// Set up the express app
const app = express(cors());

app.use(bodyParser.urlencoded({
  extended: true,
  limit:'500mb'
}));

//app.use(express.json({limit: '25mb'}));
//app.use(express.urlencoded({limit: '25mb'}));

// parse application/json
app.use(bodyParser.json({ limit: '500mb' }));
app.options('*', cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// get all
app.get('/post/get', (req, res) => {

    postRepository.findAll(sequelize).then(function(result){
  
      res.status(200).send({
        success: 'true',
        message: 'all retrieved successfully',
        data: result
      });
  
    });
    
});

app.post('/post/getbyid', (req, res) => {

  console.log('on activity /post/getbyid:');

  var id         = req.body.entry.id;
  
  postRepository.findById(sequelize,id).then(function(result){

    if(result.length > 0){
      var name = result[0].name;
      postRepository.findByName(sequelize,name).then(function(posts){

        res.status(200).send({
          success: 'true',
          message: 'all retrieved successfully',
          data: posts
        });
        
      });
      
    }else{
      res.status(200).send({
        success: 'true',
        message: 'all retrieved successfully',
        data: []
      });
    }
    
    
  });

});


app.post('/post/inactive', (req, res) => {

  console.log('on activity /post/inactive:');

  var id         = req.body.entry.name;
  
  postRepository.removeByName(sequelize,id,0);
  res.status(200).send({
    success: 'true',
    message: 'all retrieved successfully',
    data: []
  });
    
});

app.post('/post/updatepost', (req, res) => {

  console.log('on activity /post/updatepost:');

  var id           = req.body.entry.id;
  var name         = req.body.entry.name;
  var description  = req.body.entry.description;
  var content      = req.body.entry.content;
  var status       = req.body.entry.status;
  var schedule     = req.body.entry.schedule;

  console.log('status:' + status);
  console.log('schedule:' + schedule);

  postRepository.updateAll(sequelize,id,name,description,content
    ,status,schedule
    ).then(function(posts){

      res.status(200).send({
          success: 'true',
          message: 'records updated with success',
          data: posts
      });

  });

});

app.post('/post/save', (req, res) => {

    console.log('on activity /post/save:');
  
    var name         = req.body.entry.name;
    var description  = req.body.entry.description;
    var content      = req.body.entry.content;
    var status       = req.body.entry.status;
    var schedule     = req.body.entry.schedule;
    var orderpost    = req.body.entry.orderpost;

    console.log('status:' + status);
    console.log('schedule:' + schedule);

    postRepository.add(sequelize,name,description,content
      ,status,schedule,orderpost
      ).then(function(posts){

        postRepository.findByName(sequelize,name).then(function(posts){

          res.status(200).send({
            success: 'true',
            message: 'all added successfully',
            data: posts
          });
          
        });

    });

});

const PORT = settings.port.post;

//app.listen(PORT, () => {
//  console.log(`server Client running on port ${PORT}`)
//});

if(settings.https == true){

  var server = https.createServer(options,app);

  server.listen(PORT, () => {
    console.log("server Post HTTPS starting on port : " + PORT)
  });

}else{

  app.listen(PORT, () => {
    console.log(`server Post HTTP running on port ${PORT}`)
  });

}