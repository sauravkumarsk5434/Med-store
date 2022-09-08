
var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb');
var cors = require('cors');
var path = require('path')
const bodyParser = require('body-parser');
var formidable = require('formidable');
var https = require('https');
dotenv.config();
var mongoUrl = "mongodb+srv://healthmeds:healthmeds@cluster0.dnyrq.mongodb.net/healthmeds?retryWrites=true&w=majority";
var port = process.env.PORT || 5001;
var MongoClient = mongo.MongoClient;

var PaytmChecksum = require('./paytm/PaytmChecksum')
var config = require('./paytm/config')
var db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.get('/api/medicinedata', (req, res) => {
    db.collection('medicinedata').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

// login //

app.post('/api/createuser', (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;

    db.collection('users').find({ email: email }).toArray((err, exist) => {
        if (err) res.send("Registration Failed")

        if (exist.length == 0) {

            db.collection('users').insertOne({ firstName, lastName, email, mobile, password }, (err, result) => {
                if (err) res.send("Registration Failed")

                db.collection('users').find({ _id: result.insertedId }).toArray((err, getres) => {
                    if (err) res.send("Registration Failed")
                    res.send(getres)
                })
            })

        } else {
            res.send("User Exist")
        }

    })


})

app.post('/api/getuser', (req, res) => {

    db.collection('users').find({ email: req.body.email }).toArray((err, result) => {
        if (err) res.send("invalid credentials");

        if (result.length != 0) {
            if (result[0].password == req.body.password) {
                res.send(result[0])
            } else {
                res.send("invalid credentials")
            }
        } else {
            res.send("invalid credentials")
        }


    })
})


//// orders ////////

app.post("/api/getorder", (req, res) => {
   
    db.collection('users').find({ email: req.body.email }).toArray((err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.send(result)
    })

})


app.post("/api/createorder", (req, res) => {

    const feedData = {
        products: req.body.cart,
        order_id: req.body.paymentData.order_id,
        total: req.body.paymentData.amount,
        delivery_date: new Date(Date.now() + Math.ceil(Math.random() * 10) * 24 * 60 * 60 * 1000).toLocaleDateString()

    }

    db.collection('users').updateOne({ email: req.body.email }, { $push: { orders: feedData } })

    res.send("update order")
})

///// paytm Integration //////////


app.post("/payment", async (req, res) => {

    var params = {};
    params['MID'] = config.PaytmConfig.mid;
    params['WEBSITE'] = config.PaytmConfig.website;
    params['CHANNEL_ID'] = 'WEB';
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = 'TEST_' + new Date().getTime();
    params['CUST_ID'] = config.PaytmConfig.customer;
    params['TXN_AMOUNT'] = `${req.body.cost}`;
    params['CALLBACK_URL'] = 'https://medstoreapp.herokuapp.com/callback';
    params['EMAIL'] = req.body.email;
    params['MOBILE_NO'] = req.body.phone;

    const paytmchecksum = await PaytmChecksum.generateSignature(params, config.PaytmConfig.key)
    let data = { ...params, 'CHECKSUMHASH': paytmchecksum }
    res.json(data)

});

app.post('/callback', (req, res) => {

    const form = new formidable.IncomingForm()
    let paytmchecksum = req.body.CHECKSUMHASH
    let params = {};
    let verifysig = PaytmChecksum.verifySignature(req.body, config.PaytmConfig.key, paytmchecksum)


    if (verifysig) {
        params['MID'] = req.body.MID;
        params['ORDERID'] = req.body.ORDERID;

        PaytmChecksum.generateSignature(params, config.PaytmConfig.key).then(function (checksum) {

            params["CHECKSUMHASH"] = checksum;

            let post_data = JSON.stringify(params);

            var options = {
                hostname: 'securegw-stage.paytm.in', // for staging
                // hostname: 'securegw.paytm.in', // for production
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            var response = "";
            var post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });



                post_res.on('end', function () {
                    var _results = JSON.parse(response);

                    res.redirect(`https://medstoreapp.herokuapp.com/success?${_results.STATUS},${_results.BANKTXNID},${_results.TXNAMOUNT},${_results.BANKNAME},${_results.ORDERID}`)
                });
            });

            // post the data
            post_req.write(post_data);
            post_req.end();
        })
    }
})





app.use(express.static(path.join(__dirname, "client/build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})



MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log(err);
    db = client.db('healthmeds');
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

