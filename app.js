var express = require("express");
var webPush = require("web-push");
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.post("/sendNotification", (req, res) => {
    /*var endpoint = "https://fcm.googleapis.com/fcm/send/d8NLt3q2YVw:APA91bE9B4zVmw5kNyBznOzUZhqcPI_XeP4M2pkR0O2FrmoLLoSpVgcBD7LaKwTab9e5QT9tyrjx1H9zYChegQ-w7J_jQpNqhIcnC7IEomchRXOwPsSRK4M-9fkB2SAS4TE8ZMhwrf5L";
    var p256dh = "BE8FTLMvg8l1H4TKbzp2yc0bFiknFzVspLc4mAhJOmOA4N0jy7kYJFkXHlnN86Lcja8jsMxIJOdXOFDlktBodms";
    var auth = "sCvVu4sAaBI7FFTdAV2Uhg";
    
    var vapidPublicKey = "BEcjZx6myA9LIg11zU6zl88sj1KLSiI-nVePDHY6gYjKNmUGIQTF94UKMzsgctV6YKtbPIek4c2VLXOyLzwgCV0";
    var vapidPrivateKey = "gBVTFi4DQeV4XyfK2cq_WWQbbZ2oWPNLhmY5eDOixYg";*/

    var endpoint = req.body.endpoint;
    var p256dh = req.body.p256dh;
    var auth = req.body.auth;

    var vapidPublicKey = req.body.vapidPublicKey;
    var vapidPrivateKey = req.body.vapidPrivateKey;

    var pushSubscription = {
        endpoint: endpoint,
        expirationTime: null,
        keys: {
            p256dh: p256dh,
            auth: auth,
        },
    };

    var payload = "Coucou twa!";

    var options = {
        vapidDetails: {
            subject: "mailto:remileguin@live.fr",
            publicKey: vapidPublicKey,
            privateKey: vapidPrivateKey,
        },
        TTL: 60,
    };

    webPush.sendNotification(pushSubscription, payload, options);
    res.status(201).send('Notification OK');
});