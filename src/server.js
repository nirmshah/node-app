let express = require('express');
var crypto = require('crypto');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// usmongoUrlLocale when starting application locally
//let mongoUrlLocal = "mongodb://rootuser:rootpass@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://" + process.env.MONGO_DB_USERNAME + ":" + process.env.MONGO_DB_PWD + "@" + process.env.MONGO_DB_SERVER;

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = "myapp-db";

app.post('/update-profile', function (req, res) {
  let userObj = req.body;

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      if (err) throw err;
      client.close();
    });

  });
  // Send response
  res.send(userObj);
});

app.post('/insert-profile', function (req, res) {
  let userObj = req.body;

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let randomUserID = cryptoRandomNumber(1, 1000000);

    let db = client.db(databaseName);
    userObj['userid'] = randomUserID;

    let myquery = { userid: randomUserID };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      if (err) throw err;
      client.close();
    });

  });
  // Send response
  res.send(userObj);
});

app.get('/get-profile', function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

/*
Generating random numbers in specific range using crypto.randomBytes from crypto library
Maximum available range is 281474976710655 or 256^6-1
Maximum number for range must be equal or less than Number.MAX_SAFE_INTEGER (usually 9007199254740991)
Usage examples:
cryptoRandomNumber(0, 350);
cryptoRandomNumber(556, 1250425);
cryptoRandomNumber(0, 281474976710655);
cryptoRandomNumber((Number.MAX_SAFE_INTEGER-281474976710655), Number.MAX_SAFE_INTEGER);

Tested and working on 64bit Windows and Unix operation systems.
*/

function cryptoRandomNumber(minimum, maximum){
	var distance = maximum-minimum;
	
	if(minimum>=maximum){
		console.log('Minimum number should be less than maximum');
		return false;
	} else if(distance>281474976710655){
		console.log('You can not get all possible random numbers if range is greater than 256^6-1');
		return false;
	} else if(maximum>Number.MAX_SAFE_INTEGER){
		console.log('Maximum number should be safe integer limit');
		return false;
	} else {
		var maxBytes = 6;
		var maxDec = 281474976710656;
		
		// To avoid huge mathematical operations and increase function performance for small ranges, you can uncomment following script
		/*
		if(distance<256){
			maxBytes = 1;
			maxDec = 256;
		} else if(distance<65536){
			maxBytes = 2;
			maxDec = 65536;
		} else if(distance<16777216){
			maxBytes = 3;
			maxDec = 16777216;
		} else if(distance<4294967296){
			maxBytes = 4;
			maxDec = 4294967296;
		} else if(distance<1099511627776){
			maxBytes = 4;
			maxDec = 1099511627776;
		}
		*/
		
		var randbytes = parseInt(crypto.randomBytes(maxBytes).toString('hex'), 16);
		var result = Math.floor(randbytes/maxDec*(maximum-minimum+1)+minimum);
		
		if(result>maximum){
			result = maximum;
		}
		return result;
	}
}

app.listen(3000, function () {
  console.log("app listening on port 3000!");
  console.log(process.env.MONGO_DB_USERNAME);
  console.log(process.env.MONGO_DB_PWD);
  console.log(process.env.MONGO_DB_SERVER);
});
